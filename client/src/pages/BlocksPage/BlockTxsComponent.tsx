import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CollapsableTransaction from "./CollapsableTransactionComponent";

export interface IProps {
  txids: Array<string>;
  page: number;
}

const BlockTxsComponent: React.FC<IProps> = ({ txids, page }) => {
  return (
    <div>
      {txids.length ? (
        <List
          sx={{
            height: "50vh",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          {txids.map((txid, index) => {
            return (
              <ListItem key={txid}>
                <CollapsableTransaction
                  index={index + (page - 1) * 25}
                  txid={txid}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body1" align="center">
          none
        </Typography>
      )}
    </div>
  );
};

export default BlockTxsComponent;
