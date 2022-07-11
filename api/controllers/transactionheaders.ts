import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface blockHeight {
  height: Number;
}

interface blockHash {
  hash: String;
}

interface txids {
  txid: String[];
}

// Create interface for transaction headers

export const getRecentTxs = async (req: Request, res: Response, next: NextFunction) => {
  // Get latest blockheight
  // Replace this with a sql query
  let mostRecentBlockHeight: AxiosResponse = await axios.get(
    `https://blockstream.info/api//blocks/tip/height`
  );
  let lastHeight: [blockHeight] = mostRecentBlockHeight.data;

  // Get the block hash of the last height
  let blockHash: AxiosResponse = await axios.get(
    `https://blockstream.info/api/block-height/${lastHeight}`
  );
  let hash: [blockHash] = blockHash.data;

  // Get txids for the block
  let txidsResponse: AxiosResponse = await axios.get(
    `https://blockstream.info/api/block/${hash}/txids`
  );
  let txids: [txids] = txidsResponse.data;

  return res.status(200).json({
    message: txids,
  });
}

export default {
  getRecentTxs
};
