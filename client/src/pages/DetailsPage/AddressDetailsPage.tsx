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
    Box,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Address, Transaction } from "../../types/BitcoinTypes";
import AddressTxsComponent from "./AddressTxsComponent";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import "./styles.css";

export interface IProps {}

const AddressDetailsPage: React.FC<IProps> = () => {
  let { address } = useParams();
  const [addr, setAddr] = React.useState<Address | undefined>(undefined);
  const [txs, setTXs] = React.useState<Array<Transaction>>([]);

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
      })();
    }
  }, [address]);

  return (
    <div>
          <Grid sx={{ p: 2 }}>
              <Typography variant="h4" align="center" sx={{marginTop: '1.5rem', marginLeft: '1.5rem' }}>
                  Address Details
              </Typography>
              {addr ? (

                  <>
                  <Grid
                    container
                    sx={{
                        display: 'flex'
                        , alignItems: 'center'
                        , ml: '1.5rem'
                        , mb: '1.5rem'
                        , justifyContent: 'center'}}
                  >
                      <Typography variant="subtitle1" align="center">{addr["address"]}</Typography>
                      <Box sx={{marginLeft: '.75rem'}}>
                        <CopyToClipboardButton copiedText={addr.address}/>
                      </Box>
                  </Grid>

                  <Card sx={{ m: 2, marginBottom: '2rem', width: '75%', marginRight: 'auto', marginLeft: 'auto'}}>
                      <>
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
                                                      <TableCell align="right">
                                                        {addr["chain_stats"]["funded_txo_sum"] / 100000000 + " BTC"}
                                                      </TableCell>
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
                  <Typography variant="h5" align="center" sx={{ mb: "1rem" }}>
                    Recent Transactions on the Address
                  </Typography>
                  <Card sx={{ m: 2, width: '55%', mr: 'auto', ml: 'auto', mb: '3rem' }}>
                      <CardContent>
                          <AddressTxsComponent txs={txs} />
                      </CardContent>
                    </Card>
                  </>
              ) : (
                  <Typography variant="body1" sx={{marginLeft: '1.5rem'}}>Loading...</Typography>
              )}
          </Grid>
    </div>
  );
};

export default AddressDetailsPage;
