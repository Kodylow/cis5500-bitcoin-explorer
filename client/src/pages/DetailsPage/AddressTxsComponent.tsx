import { List, Grid, ListItem, Typography } from "@mui/material";
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
        <List
          sx={{
            height: "60vh",
            bgcolor: "background.paper",
            overflow: "auto",
            mt: "1rem",
          }}
        >
          {txs.map((tx, index) => {
            return (
              <ListItem key={tx["txid"]}>
                <CollapsableTransaction
                  index={index}
                  txid={tx["txid"]}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default AddressTxsComponent;
