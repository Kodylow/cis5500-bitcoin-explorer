import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import BlocksListComponent from "./BlocksListComponent";
import { BlockHeader, Transaction } from "./BlocksTypes";

export interface IBlocksPageProps {}

const BlocksPage: React.FC<IBlocksPageProps> = (props) => {
  const [block, setBlock] = React.useState<BlockHeader | undefined>(undefined);
  const [transactions, setTransactions] = React.useState<Array<Transaction>>(
    []
  );

  React.useEffect(() => {
    if (block !== undefined) {
      (async () => {
        console.log(block.hash);
        // check with David, not sure why this isn't
        const url = `http://www.localhost:5010/transactions/${block.height}/txs`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        setTransactions([...data]);
      })();
    } else {
      setTransactions([]);
    }
  }, [block]);
  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search the Timechain"
            inputProps={{ "aria-label": "Search for a Block" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <BlocksListComponent block={block} setBlock={setBlock} />
      </Grid>
      <Grid item xs={10} sx={{ p: 2 }}>
        <Typography variant="h3" align="center">
          Block: {block ? block.height : "none"}
        </Typography>
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5">Block Header Info</Typography>
            {block ? (
              <Typography variant="body1" key={block.hash}>
                {JSON.stringify(block, undefined, 2)}
              </Typography>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5">Transactions in Block</Typography>
            {transactions !== undefined ? (
              transactions.map((transaction) => (
                <Typography variant="body1" key={transaction.txid}>
                  {JSON.stringify(transaction, undefined, 2)}
                </Typography>
              ))
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlocksPage;
