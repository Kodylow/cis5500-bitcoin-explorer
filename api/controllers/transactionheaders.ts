import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from "../database/db";
import { QueryResult } from "pg";
import isValidHeight from "../utils/isValidHeight";
import getTxDetails from "../utils/getTxDetails";

interface txids {
  txid: String[];
}

interface inputAddress {
  address: string;
  value: number;
}


// Returns list of transactions for a given height
// If no height passed - use the max block height from the database
export const getTxs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let height = Number(req.query.height);

    // Check if valid height
    let valid: boolean = await isValidHeight(height);
    if (!valid && !Number.isNaN(height)) {
      throw Error("Not a valid height");
    }

    // Specify a height based on if a valid query parameter is available
    let query;
    if (height) {
      query = `
        SELECT hash FROM bitcoin.block_headers WHERE height = ${height};
      `;
    } else {
      query = `SELECT
        hash
      FROM
        bitcoin.block_headers
      WHERE
        height IN (SELECT MAX(height) as height FROM bitcoin.block_headers)`;
    }

    // get hash given height
    let pgResult: QueryResult<any> = await pool.query(query);
    let blockHashRes: any[] = pgResult.rows;
    let blockHash = blockHashRes[0]["hash"];

    // Get txids for the block
    let txidsResponse: AxiosResponse = await axios.get(
      `https://blockstream.info/api/block/${blockHash}/txids`
    );
    let txids: [txids] = txidsResponse.data;

    return res.status(200).json({
      message: txids,
    });
  } catch (err) {
    next(err);
  }
};

// Get detailed vin and vout for a specific transaction id
export const getTxDetailsByTxID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = String(req.params.id);
  let txDetail: any = await getTxDetails(id);

  return res.status(200).json({
    message: txDetail,
  });
};

export const getMerkleProof = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = String(req.params.id);
  let proof: any = await axios.get(
    `https://blockstream.info/api/tx/${id}/merkle-proof`
  );

  return res.status(200).json({
    message: proof.data,
  });
};

const getVinAddress = async (txid: string, vout: number) => {
  let results = [];

  try{
    let txDetail: any = await getTxDetails(txid);
    for (let idx = 0; idx < txDetail.vout.length; idx += 1) {
      if (idx === vout) {
        let output = {'address': '', 'value': 0};

        output['address'] = txDetail.vout[idx].scriptpubkey_address;
        output['value'] = txDetail.vout[idx].value;

        results.push(output);
      }
    }
    console.log(results);
    return results;
  } catch (err) {
    let output = {'address': '', 'value': 0};
    output.address = 'Coinbase';
    results.push(output);
    return results
  }

}

// Returns the list of vout addresses and its bitcoin value
export const getVoutAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = String(req.params.id);
  let txDetail: any = await getTxDetails(id);

  let results: Array<inputAddress> = [];
  for (let idx = 0; idx < txDetail.vin.length; idx += 1) {
    let inputAddresses: Array<inputAddress> = await getVinAddress(txDetail.vin[idx].txid, txDetail.vin[idx].vout);
    results = results.concat(inputAddresses);
  }
  return res.status(200).json({
    message: results,
  });
}

export default {
  getTxs,
  getTxDetailsByTxID,
  getMerkleProof,
  getVoutAddresses
};
