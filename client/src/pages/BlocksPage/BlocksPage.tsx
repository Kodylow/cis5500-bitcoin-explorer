import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import BlocksListComponent from "./BlocksListComponent";
import { BlockHeader } from "./BlocksTypes";
import BlockTxsComponent from "./BlockTxsComponent";
import BlockHeaderInfoComponent from "./BlockHeaderInfoComponent";
import blockImg from './block.png';


export interface IBlocksPageProps {}


const BlocksPage: React.FC<IBlocksPageProps> = (props) => {
  const [block, setBlock] = React.useState<BlockHeader | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageTXs, setPageTXs] = React.useState<Array<string>>([]);
  const [txids, setTxids] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    if (block !== undefined) {
      (async () => {
        // check with David, not sure why this isn't
        const url = `http://www.localhost:5010/blockheaders/${block.hash}/txs`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setTxids([...data.message]);
        setPageTXs([...data.message.slice(0, 25)]);
      })();
    } else {
      setTxids([]);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginRight: "auto",
            marginLeft: "auto",
            alignItems: "center",
            mt: "2rem",
          }}
        >
          {
            block ?
              <Box
                component="img"
                sx={{
                  height: "50px",
                  width: 'auto',
                  mr: ".55rem",
                }}
                alt="Block img"
                src={blockImg}
              />
              : ''
          }
          <Typography variant="h3" align="center" alignItems="center">
            {block ? 'Block ' + block.height : "No Block Selected"}
          </Typography>
        </Box>

        <BlockHeaderInfoComponent block={block} />
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5">Transactions in Block</Typography>
            <Pagination
              count={Math.ceil(txids.length / 25)}
              color="primary"
              page={page}
              onChange={(event, value) => {
                setPage(value);
                setPageTXs([...txids.slice((value - 1) * 25, value * 25)]);
              }}
            />
            <BlockTxsComponent txids={pageTXs} page={page} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlocksPage;
