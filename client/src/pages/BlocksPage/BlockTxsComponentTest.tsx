import { TableRow, TableContainer, Table, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CollapsableTransaction from "./CollapsableTransactionComponent";

export interface IProps {
  txids: Array<string>;
  page: number;
}

const BlockTxsComponentTest: React.FC<IProps> = ({ txids, page }) => {
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txids.length ? (
        <TableContainer component={Paper}>
          <Table>
          {txids.map((txid, index) => {
            return (
              <TableRow sx={{borderBottom: '.5px rgba(255, 255, 255, 0.5) solid', }}>
                <CollapsableTransaction
                  index={index + (page - 1) * 25}
                  txid={txid}
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

export default BlockTxsComponentTest;
