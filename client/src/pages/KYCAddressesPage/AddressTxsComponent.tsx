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

export interface IProps {
  txids: Array<string>;
  page: number;
  flagged: boolean;
}

const AddressTxsComponent: React.FC<IProps> = ({ txids, page, flagged }) => {
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txids.length ? (
        <TableContainer component={Paper}>
          <Table>
            {txids.map((txid, index) => {
              return (
                <TableRow
                  sx={{ borderBottom: ".5px rgba(255, 255, 255, 0.5) solid" }}
                >
                  <CollapsableTransaction
                    index={index + (page - 1) * 25}
                    txid={txid}
                    flagged={flagged}
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
