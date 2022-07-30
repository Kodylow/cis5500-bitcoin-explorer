import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "./BlocksTypes";

export interface IProps {
  transactions: Array<Transaction>;
}

const BlockTxsComponent: React.FC<IProps> = ({ transactions }) => {
  return (
    <List
      sx={{
        height: "87vh",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
      {transactions ? (
        <div>
          {transactions.map((transaction) => (
            <ListItem onClick={() => {}} key={transaction.txid}>
              transaction.txid
            </ListItem>
          ))}
        </div>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </List>
  );
};

export default BlockTxsComponent;
