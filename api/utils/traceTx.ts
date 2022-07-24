import axios, { AxiosResponse } from "axios";
import getTxDetails from './getTxDetails';

// Hardcoded example addresses for testing purposes
const exchangeAddresses = ['1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY']

const getTxOutAddresses = async (txid: String) => {
  let txDetail = await getTxDetails(txid);
  let addresses = [];

  for (let address of txDetail['vout']) {
    if (address['scriptpubkey_address']) addresses.push(address['scriptpubkey_address']);
  }

  return addresses;
}

const findNextTxsInAddress = async (txid: String, address: String) => {
  let nextTxs = new Set();
  let addressDetailResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/address/${address}/txs`
  );
  let addressTxs = addressDetailResponse.data;

  for (let tx of addressTxs) {
    let txDetail = await getTxDetails(tx['txid']);
    let vins = txDetail['vin']

    for (let vin of vins) {
      if (vin['txid'] === txid) {
        nextTxs.add(tx['txid']);
      }
    }
  }

  return Array.from(nextTxs);
}

const getNextTxs = async (txid: String) => {
  let addresses = await getTxOutAddresses(txid);
  let nextTxs = [];

  for (let address of addresses) {
    let txs = await findNextTxsInAddress(txid, address)
    for (let tx of txs) {
      nextTxs.push(tx);
    }
  }

  return nextTxs;
}

// get all transactions
const bfsTxs = async (startTxId: String) => {
  const visited = new Set();
  const queue = [startTxId];
  let result = [];
  let timeout = true;
  let sentToExchange = 'No';

  // Set time out to 30 seconds
  setTimeout( () => {
    timeout = false
    sentToExchange = 'Unknown';
  }, 30000);

  while (queue.length > 0 && timeout) {
    const tx: String = queue.shift()!;

    // Get next transactions
    let nextTxs = await getNextTxs(tx);
    result.push({startTx: tx, nextTxs: nextTxs});
    for (const nextTx of nextTxs) {
      // If we matched to an address of an exchange break
      let addresses = await getTxOutAddresses(nextTx as String);
      for (let address of addresses) {
        if (exchangeAddresses.includes(address)) {
          sentToExchange = 'Yes';
          console.log(`This is an exchange transaction: ${tx} and address ${address}`);
        };
      }

      // If we haven't visted the transaction add to the queue
      if (!visited.has(nextTx)) {
        visited.add(nextTx);
        queue.push(nextTx as String);
      }
    }
  }
  return {result, sentToExchange};
}

export default {
  getNextTxs,
  bfsTxs
}
