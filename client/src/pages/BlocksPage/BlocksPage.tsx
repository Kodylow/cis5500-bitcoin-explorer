import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import BlocksListComponent from "./BlocksListComponent";
import { BlockHeader } from "../../types/BitcoinTypes";
import BlockTxsComponent from "./BlockTxsComponent";
import BlockHeaderInfoComponent from "./BlockHeaderInfoComponent";
import blockImg from "./block.png";
import axios from "axios";

export interface IBlocksPageProps {}

const BlocksPage: React.FC<IBlocksPageProps> = (props) => {
  const [block, setBlock] = React.useState<BlockHeader | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageTXs, setPageTXs] = React.useState<Array<string>>([]);
  const [txids, setTxids] = React.useState<Array<string>>([]);

  // Set the initial block header to the maximum block height in database
  React.useEffect(() => {
    (async () => {
      // To compare the current height in database with esplora current height
      let esploraMaxHeight = await (
        await fetch("https://blockstream.info/api/blocks/tip/height")
      ).json();
      let currMaxHeight = await (
        await fetch("http://www.localhost:5010/blockheaders/height")
      ).json();
      let parsedHeight = currMaxHeight.message[0].height;
      const res = await (
        await fetch(`http://www.localhost:5010/blockheaders/${parsedHeight}`)
      ).json();
      const data: BlockHeader = res.message[0];
      setBlock(data);

      // Load missing blocks
      if (esploraMaxHeight > parsedHeight) {
        await axios.post(
          `http://www.localhost:5010/blockheaders?startHeight=${parsedHeight}&endHeight=${esploraMaxHeight}`
        );
      }
    })();
  }, []);

  React.useEffect(() => {
    if (block !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/blockheaders/${block.hash}/txs`;
        let res = await fetch(url);
        let data = await res.json();
        setTxids([...data.message]);
        setPageTXs([...data.message.slice(0, 15)]);
      })();
    } else {
      setTxids([]);
    }
  }, [block]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
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
          {block ? (
            <Box
              component="img"
              sx={{
                height: "50px",
                width: "auto",
                mr: ".55rem",
              }}
              alt="Block img"
              src={blockImg}
            />
          ) : (
            ""
          )}
          <Typography variant="h3" align="center" alignItems="center">
            {block ? "Block " + block.height : "Loading..."}
          </Typography>
        </Box>
        <Box sx={{width: '90%', mr: 'auto', ml: 'auto'}}>
          <BlockHeaderInfoComponent block={block} />
        </Box>
        <Typography variant="h5" sx={{ mb: "1rem", m: 2 }} align='center'>
          Transactions in Block
        </Typography>
        <Card sx={{ m: 2, width: '60%', marginRight: 'auto', marginLeft: 'auto'}}>
          <CardContent>
            <Pagination
              count={Math.ceil(txids.length / 15)}
              color="primary"
              page={page}
              onChange={(event, value) => {
                setPage(value);
                setPageTXs([...txids.slice((value - 1) * 15, value * 15)]);
              }}
              sx={{mb: '1rem'}}
            />
            <BlockTxsComponent txids={pageTXs} page={page} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlocksPage;
