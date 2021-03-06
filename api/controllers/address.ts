import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

// Get address level data (i.e. funded_txo_count)
const getAddress = async (req: Request, res: Response, next: NextFunction) => {
  // get the block hash from the req
  let address: string = String(req.params.address);

  // query to get blockheader data
  let addressRes: AxiosResponse = await axios.get(
    `https://blockstream.info/api/address/${address} `
  );
  let addressData: any = addressRes.data;

  return res.status(200).json({
    message: addressData,
  });
};

// Get address level txs data - list all txs from a specific address
const getAddressTxs = async (req: Request, res: Response, next: NextFunction) => {
  // get the block hash from the req
  let address: string = String(req.params.address);

  // query to get blockheader data
  let addressTxsRes: AxiosResponse = await axios.get(
    `https://blockstream.info/api/address/${address}/txs`
  );
  let addressTxsData: any = addressTxsRes.data;

  return res.status(200).json({
    message: addressTxsData,
  });
};

export default { getAddress, getAddressTxs };
