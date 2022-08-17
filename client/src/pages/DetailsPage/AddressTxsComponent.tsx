import {
  TableRow,
  TableContainer,
  Table,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import CollapsableTransaction from "../BlocksPage/CollapsableTransactionComponent";
import { Transaction } from "../../types/BitcoinTypes";

export interface IProps {
  txs: Array<Transaction>;
  flagged: boolean;
}

const AddressTxsComponent: React.FC<IProps> = ({ txs, flagged }) => {
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txs.length ? (
        <TableContainer component={Paper}>
          <Table>
            <tbody>
              {txs.map((tx, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: ".5px rgba(255, 255, 255, 0.5) solid",
                      color: flagged ? "red" : "rgb(0, 204, 255)",
                    }}
                  >
                    <CollapsableTransaction
                      index={index}
                      txid={tx["txid"]}
                      flagged={flagged}
                    />
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default AddressTxsComponent;
