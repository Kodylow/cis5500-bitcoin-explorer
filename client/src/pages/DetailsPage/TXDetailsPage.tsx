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
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../../types/BitcoinTypes";
import { Tree } from "react-tree-graph";
import "./styles.css";
import sha256 from "crypto-js/sha256";

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

  return (
    <div>
      <Grid>
        <Typography sx={{ m: 2 }} variant="h3" alignSelf={"center"}>
          Transaction Details
        </Typography>
        {tx ? (
          <Card sx={{ m: 2 }}>
            <>
              <Typography sx={{ m: 2 }} variant="subtitle1">
                {tx["txid"]}
              </Typography>
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
        {blockHash ? (
          <Card sx={{ m: 2 }}>
            <Typography sx={{ m: 2 }} variant="subtitle1">
              Block Header
            </Typography>
            <Typography sx={{ m: 2 }} variant="body1">
              {blockHash}
            </Typography>
          </Card>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>
      <div id="treeWrapper" style={{ width: "100%", height: "40em" }}>
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
      </div>
    </div>
  );
};

export default TXDetailsPage;
