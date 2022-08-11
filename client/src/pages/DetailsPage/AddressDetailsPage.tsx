import {
    Card,
    CardContent,
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
import { Address, Transaction } from "../../types/BitcoinTypes";
import AddressTxsComponent from "./AddressTxsComponent";
import { Tree } from "react-tree-graph";
import "./styles.css";

export interface IProps {}

const AddressDetailsPage: React.FC<IProps> = () => {
  let { address } = useParams();
  const [addr, setAddr] = React.useState<Address | undefined>(undefined);
  const [txs, setTXs] = React.useState<Array<Transaction>>([]);
  // const [tree, setTree] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (address !== undefined) {
      (async () => {
        const url = `https://blockstream.info/api/address/${address}`;
        let res = await fetch(url);
        let data = await res.json();
        setAddr(data);
      })();
    }
  }, [address]);

  React.useEffect(() => {
    if (address !== undefined) {
      (async () => {
        const url = `https://blockstream.info/api/address/${address}/txs`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data.message);
        setTXs(data);
          console.log(txs);
          console.log(txs.length);
      })();
    }
  }, [address]);

  return (
    <div>
          <Grid>
              <Typography sx={{ m: 2 }} variant="h3" alignSelf={"center"}>
                  Address Details
              </Typography>
              {addr ? (
                  <><Card sx={{ m: 2 }}>
                      <><Typography sx={{ m: 2 }} variant="subtitle1">{addr["address"]}</Typography>
                          <Grid container spacing={1}>
                              <Grid item xs={6}>
                                  <Card sx={{ m: 2 }}>
                                      <TableContainer component={Paper}>
                                          <Table sx={{ minWidth: 350 }}>
                                              <TableBody>
                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Funded TXO Count
                                                      </TableCell>
                                                      <TableCell align="right">
                                                          {addr["chain_stats"]["funded_txo_count"]}
                                                      </TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Funded TXO Sum
                                                      </TableCell>
                                                      <TableCell align="right">{addr["chain_stats"]["funded_txo_sum"]}</TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Spent TXO Count
                                                      </TableCell>
                                                      <TableCell align="right">{addr["chain_stats"]["spent_txo_count"]}</TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Spent TXO Sum
                                                      </TableCell>
                                                      <TableCell align="right">{addr["chain_stats"]["spent_txo_sum"]}</TableCell>
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
                                                          Transaction Count
                                                      </TableCell>
                                                      <TableCell align="right">{addr["chain_stats"]["tx_count"]}</TableCell>
                                                  </TableRow>
                                              </TableBody>
                                          </Table>
                                      </TableContainer>
                                  </Card>
                              </Grid>
                          </Grid></>
                  </Card>
                  <Card sx={{ m: 2 }}>
                      <CardContent>
                          <Typography variant="h5" sx={{ mb: "1rem" }}>
                              Recent Transactions on Address
                          </Typography>
                          <AddressTxsComponent txs={txs} />
                      </CardContent>
                    </Card>
                  </>
              ) : (
                  <Typography variant="body1">Loading...</Typography>
              )}
          </Grid>
    </div>
  );
};

export default AddressDetailsPage;
