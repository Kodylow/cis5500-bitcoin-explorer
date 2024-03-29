import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { QueryResult } from "pg";
import pool from "../database/db";
//import KYCAddressesPage from "../../client/src/pages/KYCAddressesPage/KYCAddressesPage";

// Get all addresses
const getAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const all_addresses_query = `
    SELECT
      DISTINCT address
    FROM
      bitcoin.txidaddress
  `;
  let pgResult: QueryResult<any> = await pool.query(all_addresses_query);
  let addresses: any[] = pgResult.rows;
  return res.status(200).json({
    message: addresses,
  });
};

//Get first address
const getFirstAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const first_address_query = `
    SELECT
      DISTINCT address
    FROM
      bitcoin.txidaddress
    LIMIT 1
  `;
  let pgResult: QueryResult<any> = await pool.query(first_address_query);
  let top_address: any[] = pgResult.rows;
  return res.status(200).json({
    message: top_address,
  });
};

//Get address txids
const getTxids = async (req: Request, res: Response, next: NextFunction) => {
  let address: string = String(req.params.address);
  const txs_query = `
    SELECT
      txid
    FROM
      bitcoin.txidaddress
    WHERE address = '${address}'
  `;
  let pgResult: QueryResult<any> = await pool.query(txs_query);
  let txids: any[] = [];

  pgResult.rows.forEach((row) => {
    txids.push(row.txid);
  });
  return res.status(200).json({
    message: txids,
  });
};

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
const getAddressTxs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// Check if address is flagged
const getAddressFlagged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = `
    SELECT
      COUNT(address)
    FROM
      bitcoin.txidaddress
    WHERE
      address = '${String(req.params.address)}';
    `;
    let pgResult: QueryResult<any> = await pool.query(query);
    let flagged: any[] = pgResult.rows;
    return res.status(200).json({
      message: flagged[0]["count"] !== "0" ? true : false,
    });
  } catch (err) {
    return res.status(200).json({
      message: false,
    });
  }

};

// Check if any address is flagged
const postAddressesFlagged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let addresses: string[] = req.body;
    let query = `
      SELECT DISTINCT
        address
      FROM
        bitcoin.txidaddress
      WHERE
        address in ('${String(addresses.join("','"))}');
    `;
    let pgResult: QueryResult<any> = await pool.query(query);

    let flagged: any[] = pgResult.rows;
    flagged = flagged.map((row) => row.address as string);
    return res.status(200).json({
      message: flagged,
    });
  } catch (error) {
    return res.status(200).json({
      message: [] as string[],
    });
  }
};

export default {
  getAddress,
  getAddressTxs,
  getAddresses,
  getFirstAddress,
  getTxids,
  getAddressFlagged,
  postAddressesFlagged,
};
