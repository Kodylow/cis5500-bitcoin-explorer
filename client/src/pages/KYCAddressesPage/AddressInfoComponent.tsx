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
  import { Address } from "./AddressesTypes";
  import moment from "moment";
  
  export interface IProps {
    address: Address | undefined;
  }
  
  
  const AddressInfoComponent: React.FC<IProps> = ({ address }) => {
    return (
        <React.Fragment>
        <Card sx={{ m: 2 }}>
          <Typography variant="h5" sx={{ ml: "1rem", mt: "1rem" }}>
            Address Information
          </Typography>
          {address ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Address:
                    </TableCell>
                    <TableCell component="th" scope="row" />
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "right" }}
                    >
                      {address["address"]}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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