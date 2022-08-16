import { TableRow, TableContainer, Table, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CollapsableTransaction from "../BlocksPage/CollapsableTransactionComponent";
import { Transaction } from "../../types/BitcoinTypes";

export interface IProps {
  txs: Array<Transaction>;
}

const AddressTxsComponent: React.FC<IProps> = ({ txs }) => {
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txs.length ? (
        <TableContainer component={Paper}>
          <Table>
            {txs.map((tx, index) => {
              return (
                <TableRow sx={{borderBottom: '.5px rgba(255, 255, 255, 0.5) solid', }}>
                  <CollapsableTransaction
                      index={index}
                      txid={tx["txid"]}
                    />
                </TableRow>
              );
            })}
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
