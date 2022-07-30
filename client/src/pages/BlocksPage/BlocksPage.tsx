import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import BlocksListComponent from "./BlocksListComponent";
import { BlockHeader, Transaction } from "./BlocksTypes";

export interface IBlocksPageProps {}

const BlocksPage: React.FC<IBlocksPageProps> = (props) => {
  const [block, setBlock] = React.useState<BlockHeader | null>(null);
  const [page, setPage] = React.useState(1);
  const [transactions, setTransactions] = React.useState<Array<Transaction>>(
    []
  );

  React.useEffect(() => {
    if (block !== null) {
      (async () => {
        console.log(block.hash);
        // check with David, not sure why this isn't
        const url = `http://www.localhost:5010/blockheaders/${block.hash}/txs`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setTransactions([...data.message]);
      })();
    } else {
      setTransactions([]);
    }
  }, [block]);
  return (
    <Grid container spacing={1}>
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
                {JSON.stringify(block, null, 2)}
              </Typography>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5">Transactions in Block</Typography>
            <Pagination count={10} color="primary" page={page} />
            {transactions !== null ? (
              transactions.map((transaction) => (
                <Typography variant="body1" key={transaction.txid}>
                  {JSON.stringify(transaction, null, 2)}
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
