import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    Grid,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Address } from "../../types/BitcoinTypes";

  export interface IProps {
    address: Address | undefined;
  }

  const AddressInfoComponent: React.FC<IProps> = ({ address }) => {
    const [addressData, setAddressData] = React.useState<Address | undefined>(undefined);

    // Retrieve additional information on address
    React.useEffect(() => {
      (async () => {
        if (address !== undefined) {
          const res = await (
            await fetch(`http://www.localhost:5010/address/${address.address} `)
          ).json();
          const data: Address = res.message;
          setAddressData(data);
        }
      })();
    }, [address]);

    return (
      <React.Fragment>
        <Typography variant="h5" sx={{ ml: "1rem", mt: "1rem" }} align="center">
          Address Information
        </Typography>
        <Card sx={{ m: 2 }}>
          {address ? (
          <Card sx={{ m: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableBody>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                          Funded TXO Count
                      </TableCell>
                      <TableCell align="right">
                        {addressData ? addressData.chain_stats.funded_txo_count : 'Loading... '}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                          Funded TXO Sum
                      </TableCell>
                      <TableCell align="right">
                        {addressData ? addressData.chain_stats.funded_txo_sum / 100000000 + " BTC" : 'Loading... '}
                      </TableCell>
                    </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={6}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableBody>

                    <TableRow>
                      <TableCell component="th" scope="row">
                          Spent TXO Count
                      </TableCell>
                      <TableCell align="right">
                        {addressData ? addressData.chain_stats.spent_txo_count : 'Loading... '}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                          Spent TXO Sum
                      </TableCell>
                      <TableCell align="right">
                        {addressData ? addressData.chain_stats.spent_txo_sum / 100000000 + " BTC" : 'Loading... '}
                      </TableCell>
                    </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Card>
          ) : (
            <Typography
              variant="h5"
              align="center"
              alignItems="center"
              sx={{ padding: "2rem" }}
            >
              Loading...
            </Typography>
          )}
        </Card>
      </React.Fragment>
    )
  }

  export default AddressInfoComponent
