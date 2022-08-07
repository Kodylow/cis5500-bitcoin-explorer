import { List, Grid, ListItem, Typography } from "@mui/material";
import React from 'react'
import CollapsableTransaction from "../BlocksPage/CollapsableTransactionComponent";

export interface IProps {
    txids: Array<string>;
    page: number;
  }

const AddressTxsComponent: React.FC<IProps> = ({txids, page}) => {
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txids.length ? (
        <List
          sx={{
            height: "60vh",
            bgcolor: "background.paper",
            overflow: "auto",
            mt: "1rem",
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
          Loading...
        </Typography>
      )}
    </Grid>
  )
}

export default AddressTxsComponent