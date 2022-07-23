import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from '../database/db';
import { QueryResult } from 'pg';
import getBlockHash from '../utils/getBlockHash';


// Trace the next set of transactions given a specific transaction id
export const getTracedTxs = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = String(req.params.id);

  // query to get blockheader data
  let txDetailResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/tx/${id}`
  );
  let txDetail: any = txDetailResponse.data;
  const txStartingHeight = txDetail.status.block_height;

  console.log(txStartingHeight);

  let currHeight = txStartingHeight + 151;
  let hash = await getBlockHash(currHeight);

  /*
    Example:

    1. Coinbase: https://blockstream.info/tx/1d8149eb8d8475b98113b5011cf70e0b7a4dccff71286d28b8b4b641f94f1e46?expand
    2. In block 700151 - it is used as vin of a tx: https://blockstream.info/tx/5944d4ff0e5620c7933c9a3c15c21f2dd33a6f8192a54109711a8a374a6bf1e3

  */

  let tracedTxs = [];
  tracedTxs.push(txDetail);


  while (true) {
    try {
      // Get hash given height
      let blockHash = await getBlockHash(currHeight);

      // Get all transactions in the block
      let txidsResponse: AxiosResponse = await axios.get(
        `https://blockstream.info/api/block/${blockHash}/txids`
      );
      let txids: any = txidsResponse.data;
      console.log(txids)

      for (let txid of txids) {
        let txResponse: AxiosResponse = await axios.get(
          `https://blockstream.info/api/tx/${txid}`
        );
        let txData: any = txResponse.data;
        for (let txin of txData['vin']) {
          if (txin['txid'] === id) {
            tracedTxs.push(txData);
          }
        }
      }


      currHeight += 1;
      if (currHeight === txStartingHeight + 1) break;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  return res.status(200).json({
    message: tracedTxs
  })
};

export default {
  getTracedTxs
};
