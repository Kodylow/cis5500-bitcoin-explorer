import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import { Transaction } from "../../types/BitcoinTypes";
import React from "react";

export interface IProps {
  transaction: Transaction | undefined;
}

const TransactionHeaderInfoComponent: React.FC<IProps> = ({ transaction }) => {
  // sx={{backgroundColor: '#111316'}}
  // sx={{backgroundColor: '#24273d'}}
  // #15181b
  // #121212

  return (
    <React.Fragment>
      <Typography variant="h6" align="left" sx={{ opacity: 0.9, mb: ".25rem" }}>
        Transaction Headers
      </Typography>
      <Card sx={{ backgroundColor: "#24273d", opacity: 0.8 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 350, backgroundColor: "#15191d" }}
            aria-label="simple table"
          >
            {transaction ? (
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Version
                  </TableCell>
                  <TableCell align="right">{transaction["version"]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Locktime
                  </TableCell>
                  <TableCell align="right">{transaction["locktime"]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Size
                  </TableCell>
                  <TableCell align="right">{transaction["size"]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Weight
                  </TableCell>
                  <TableCell align="right">{transaction["weight"]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Fee
                  </TableCell>
                  <TableCell align="right">{transaction["fee"]}</TableCell>
                </TableRow>
              </TableBody>
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </React.Fragment>
  );
};

export default TransactionHeaderInfoComponent;
