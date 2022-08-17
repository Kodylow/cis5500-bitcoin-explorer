import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import pool from "../database/db";
import { QueryResult } from "pg";
import isValidHeight from "../utils/isValidHeight";
import getTxDetails from "../utils/getTxDetails";
import { isJSDocReturnTag } from "typescript";

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
  let runPy = new Promise(function (success, nosuccess) {
    const { spawn } = require("child_process");
    const pyprog = spawn("python3", [
      __dirname + "/merkle_proof.py",
      JSON.stringify([id, proof.data.merkle, proof.data.pos]),
    ]);

    pyprog.stdout.on("data", function (data: any) {
      success(data);
    });

    pyprog.stderr.on("data", (data: any) => {
      nosuccess(data);
    });
  });

  runPy
    .then((data: any) => {
      return res.status(200).json({
        message: data.toString("utf8"),
      });
    })
    .catch((err: any) => {
      console.log("err", err.toString("utf8"));
    });
};

const getVinAddress = async (txid: string, vout: number) => {
  let results = [];

  try {
    let txDetail: any = await getTxDetails(txid);
    for (let idx = 0; idx < txDetail.vout.length; idx += 1) {
      if (idx === vout) {
        let output = { address: "", value: 0 };

        output["address"] = txDetail.vout[idx].scriptpubkey_address;
        output["value"] = txDetail.vout[idx].value;

        results.push(output);
      }
    }
    console.log(results);
    return results;
  } catch (err) {
    let output = { address: "", value: 0 };
    output.address = "Coinbase";
    results.push(output);
    return results;
  }
};

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
    let inputAddresses: Array<inputAddress> = await getVinAddress(
      txDetail.vin[idx].txid,
      txDetail.vin[idx].vout
    );
    results = results.concat(inputAddresses);
  }
  return res.status(200).json({
    message: results,
  });
};

// Check if TX is flagged
const getTXFlagged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query = `
    SELECT
      COUNT(txid)
    FROM
      bitcoin.txidaddress
    WHERE
      txid = '${String(req.params.id)}';
  `;
  let pgResult: QueryResult<any> = await pool.query(query);
  let flagged: any[] = pgResult.rows;
  return res.status(200).json({
    message: flagged[0]["count"] !== "0" ? true : false,
  });
};

// Post new flagged TXS to the database
export const postFlaggedTXs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = req.body;
  console.log("data", data);
  let arr = data.map(
    (entry: { txid: string; address: string }) =>
      `('${entry.txid}', '${entry.address}')`
  );

  let query = `
    INSERT INTO bitcoin.txidaddress (txid, address)
    VALUES ${arr};
  `;
  console.log(query);
  try {
    let pgResult: QueryResult<any> = await pool.query(query);
    return res.status(200).json({
      message: "Success",
    });
  } catch {
    return res.status(200).json({
      message: "No Insert",
    });
  }
};

// Get all flagged TXs
export const checkFlaggedTXs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = req.body.join("','");

  let query = `
    SELECT DISTINCT
      txid
    FROM
      bitcoin.txidaddress
    WHERE
      txid IN ('${data}');
  `;
  let pgResult: QueryResult<any> = await pool.query(query);
  let flagged: any[] = pgResult.rows;
  return res.status(200).json({
    message: flagged,
  });
};

export default {
  getTxs,
  getTxDetailsByTxID,
  getMerkleProof,
  getVoutAddresses,
  getTXFlagged,
  postFlaggedTXs,
  checkFlaggedTXs,
};
