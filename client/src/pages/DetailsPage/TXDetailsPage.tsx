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
  Box,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction, VinAddress } from "../../types/BitcoinTypes";
import { Tree } from "react-tree-graph";
import InputOutputComponent from "./InputOutputComponent";
import "./styles.css";
import sha256 from "crypto-js/sha256";
import transaction from "./transaction.png";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";

export interface IProps {}

const TXDetailsPage: React.FC<IProps> = () => {
  let { txid } = useParams();
  const [tx, setTx] = React.useState<Transaction | undefined>(undefined);
  const [merkleRoot, setMerkleRoot] = React.useState<String | undefined>(
    undefined
  );
  const [calcMerkleRoot, setCalcMerkleRoot] = React.useState<
    String | undefined
  >(undefined);
  const [vins, setVins] = React.useState<Array<VinAddress> | undefined>(
    undefined
  );

  const [tree, setTree] = React.useState<any>(undefined);
  const [flagged, setFlagged] = React.useState<boolean>(false);

  React.useEffect(() => {
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
        let merkleRoot = blockHeader.message[0].merkle_root;
        setMerkleRoot(merkleRoot);
        url = `http://localhost:5010/transactions/${txid}/merkle-proof`;
        res = await fetch(url);
        data = await res.json();
        data = JSON.parse(data.message);
        setCalcMerkleRoot(data.calculated_merkle_root);
        setTree(data.tree);
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

  React.useEffect(() => {
    if (txid !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/transactions/flagged/${txid}`;
        let res = await fetch(url);
        let data = await res.json();
        if (data.message) {
          setFlagged(true);
        } else {
          setFlagged(false);
        }
      })();
    } else {
      setFlagged(false);
    }
  }, [txid]);

  return (
    <div style={{ paddingBottom: "2rem" }}>
      <Grid>
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
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
            {flagged ? "KYCed Transaction Details" : "Transaction Details"}
          </Typography>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#fff" }} variant="subtitle1">
            {tx ? tx["txid"] : ""}
          </Typography>
          <Box sx={{ marginLeft: ".75rem" }}>
            <CopyToClipboardButton copiedText={tx ? tx.txid : ""} />
          </Box>
        </Grid>

        {tx ? (
          <Card sx={{ mb: "2rem", width: "90%", ml: "auto", mr: "auto" }}>
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
                          <TableRow>
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

        <Typography
          variant="h4"
          align="center"
          sx={{ letterSpacing: "1px", color: "#fff", marginBottom: "1rem" }}
        >
          Inputs & Outputs
        </Typography>
        <Box sx={{ width: "90%", ml: "auto", mr: "auto" }}>
          {tx ? (
            <InputOutputComponent tx={tx} vins={vins}></InputOutputComponent>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Box>

        {merkleRoot && calcMerkleRoot ? (
          <React.Fragment>
            <Typography sx={{ m: 2 }} align="center" variant="h4">
              Merkle Proof
            </Typography>
            <Card sx={{ m: 2, width: "90%", ml: "auto", mr: "auto" }}>
              <Typography sx={{ m: 2 }} variant="body1">
                Merkle Root: {merkleRoot}
              </Typography>
              <Typography sx={{ m: 2 }} variant="body1">
                Calculated Merkle Root: {calcMerkleRoot}
              </Typography>
            </Card>
          </React.Fragment>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>

      <Card
        id="treeWrapper"
        sx={{ m: 2, height: "100%", width: "90%", ml: "auto", mr: "auto" }}
      >
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
