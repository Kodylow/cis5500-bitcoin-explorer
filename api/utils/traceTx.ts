import axios, { AxiosResponse } from "axios";
import getTxDetails from './getTxDetails';

// Hardcoded example addresses for testing purposes
const exchangeAddresses = ['1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY']


/*

Given a vout (txid + index vout) - initial load:

1. Return all vins involved in that txid


Given a list of vouts:

1. For each vout, return a list of vins
2. Inside each vin - check if this transaction was involved in an address that was in known_addresses

*/

// Test: http://localhost:5010/utxos/c3322d6cf29ffbf96908467bd22cc147d8a6a2949710f07f0c27da91b153954f:0
const getUtxoDetail = async (utxo: String) => {
  let txid = utxo.split(':')[0];
  let txidVout = Number(utxo.split(':')[1]);
  let txData = await getTxDetails(txid);
  let vouts = txData['vout'];
  let results;

  // console.log(txData);

  for (let idx = 0; idx < vouts.length; idx += 1) {
    if (idx === txidVout) {
      results = vouts[idx];
    }
  }

  return results;
}

const getVinsDetail = async (utxo: String) => {
  let txid = utxo.split(':')[0];
  console.log(txid);
  let txData = await getTxDetails(txid);
  let vins = txData['vin'];
  let results = [];

  console.log(txData);

  for (let vin of vins) {
    results.push(vin);
  }

  return results;
}

const getUtxo = async (utxo: String) => {
  let results;
  let utxoData = await getUtxoDetail(utxo);
  let vinsData = await getVinsDetail(utxo);
  results = { utxoData, vinsData }
  return results;
}

const getUtxos = async (utxos: String[]) => {
  let results = [];

  for (let utxo of utxos) {
    let utxoData = await getUtxo(utxo);
    results.push(utxoData);
  }

  return results
}

export default {
  getUtxo,
  getUtxos
}
