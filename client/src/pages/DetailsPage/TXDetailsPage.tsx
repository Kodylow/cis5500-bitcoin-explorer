import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  Paper,
  Typography,
  Box
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction, VinAddress } from "../../types/BitcoinTypes";
import { Tree } from "react-tree-graph";
import InputOutputComponent from './InputOutputComponent';
import "./styles.css";
import sha256 from "crypto-js/sha256";
import transaction from "./transaction.png";

export interface IProps {}

interface MerkleProof {
  blockheight: number;
  merkle: Array<string>;
  pos: number;
}

function hash256(data: string) {
  let hash = sha256(data);
  return sha256(hash);
}

const TXDetailsPage: React.FC<IProps> = () => {
  let { txid } = useParams();
  const [tx, setTx] = React.useState<Transaction | undefined>(undefined);
  const [blockHash, setBlockHash] = React.useState<String | undefined>(
    undefined
  );
  const [vins, setVins] = React.useState<Array<VinAddress> | undefined>(undefined);


  const [tree, setTree] = React.useState<any>(undefined);

  React.useEffect(() => {
    const buildMerkleTree = (m: MerkleProof) => {
      let h = txid;
      let data = { name: h, children: {} };
      let index = m.pos;
      let inner_node;
      for (const i of m.merkle) {
        let name_i = i.slice(0, 3) + ".." + i.slice(i.length - 3);
        if (index & 1) {
          inner_node = i + h;
          h = hash256(inner_node).toString();
          data = {
            name: "",
            children: [
              data,
              {
                name: name_i,
              },
            ],
          };
        } else {
          inner_node = h + i;
          h = hash256(inner_node).toString();
          data = {
            name: "",
            children: [
              {
                name: name_i,
              },
              data,
            ],
          };
        }
        index >>= 1;
      }
      setTree(data);
    };

    if (txid !== undefined) {
      (async () => {
        let url = `http://localhost:5010/transactions/${txid}`;
        let res = await fetch(url);
        let data = await res.json();
        setTx(data.message);
        let blockHeader = await (
          await fetch(
            `http://localhost:5010/blockheaders/${data.message.status.block_height}`
          )
        ).json();
        let blockHash = blockHeader.message[0].hash;
        setBlockHash(blockHash);
        url = `http://localhost:5010/transactions/${txid}/merkle-proof`;
        res = await fetch(url);
        data = await res.json();
        buildMerkleTree(data.message);
      })();
    }
  }, [txid]);

  React.useEffect(() => {
    if (txid !== undefined) {
      (async () => {
        const url = `http://localhost:5010/transactions/vouts/${txid}`;
        let res = await fetch(url);
        let data = await res.json();
        setVins(data.message);
      })();
    }
  }, [txid]);

  return (
    <div style={{paddingBottom: '2rem'}}>
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center', marginLeft: '.5rem', marginTop: '1rem'}}>
          <Box
            component="img"
            sx={{
              height: "55px",
              width: "auto",
            }}
            alt="Arrow img"
            src={transaction}
          />
          <Typography variant="h4" alignSelf={"center"}>
            Transaction Details
          </Typography>
        </Grid>

        <Typography sx={{color: '#fff', m: 2 }} variant="subtitle1">
          {tx ? tx["txid"] : ''}
        </Typography>
        {tx ? (
          <Card sx={{ m: 2 }} style={{marginBottom: '2rem'}}>
            <>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Card sx={{ m: 2 }}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 350 }}>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Version
                            </TableCell>
                            <TableCell align="right">{tx["version"]}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell component="th" scope="row">
                              Locktime
                            </TableCell>
                            <TableCell align="right">
                              {tx["locktime"]}
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell component="th" scope="row">
                              Size
                            </TableCell>
                            <TableCell align="right">{tx["size"]}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell component="th" scope="row">
                              Weight
                            </TableCell>
                            <TableCell align="right">{tx["weight"]}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ m: 2 }}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 350 }}>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Fee
                            </TableCell>
                            <TableCell align="right">{tx["fee"]}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Inputs
                            </TableCell>
                            <TableCell align="right">
                              {tx["vin"].length}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Outputs
                            </TableCell>
                            <TableCell align="right">
                              {tx["vout"].length}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              </Grid>
            </>
          </Card>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}

        {tx? (<InputOutputComponent tx={tx} vins={vins} ></InputOutputComponent>) : <Typography variant="body1">Loading...</Typography> }

        {blockHash ? (
          <React.Fragment>
            <Typography sx={{ m: 2 }} variant="h4">
              Merkle Tree
            </Typography>
            <Card sx={{ m: 2 }}>

              <Typography sx={{ m: 2 }} variant="body1">
                Block Hash: {blockHash}
              </Typography>
            </Card>
          </React.Fragment>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>


      <Card id="treeWrapper" sx={{ m: 2, height: '100%' }} >
        {tree ? (
          <div className="custom-container">
            <Tree
              data={tree}
              height={400}
              svgProps={{
                className: "custom",
              }}
              width={1200}
            />
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Card>
    </div>
  );
};

export default TXDetailsPage;
// style={{ width: "100%", height: "40rem" }}
