import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { BlockHeader } from "../../types/BitcoinTypes";
import BlockTxsComponent from "../BlocksPage/BlockTxsComponent";
import BlockHeaderInfoComponent from "../BlocksPage/BlockHeaderInfoComponent";
import blockImg from "../BlocksPage/block.png";
import "./styles.css";

export interface IProps {}

const BlockDetailsPage: React.FC<IProps> = () => {
  let { blockheight } = useParams();
  const [block, setBlock] = React.useState<BlockHeader | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageTXs, setPageTXs] = React.useState<string[]>([]);
  const [txids, setTxids] = React.useState<string[]>([]);
  const [flaggedTXs, setFlaggedTXs] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (blockheight !== undefined) {
      (async () => {
        const url = `http://localhost:5010/blockheaders/${blockheight}`;
        let res = await fetch(url);
        let data = await res.json();
        setBlock(data.message[0]);
      })();
    }
  }, [blockheight]);

  console.log(block);

  React.useEffect(() => {
    if (block !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/blockheaders/${block.hash}/txs`;
        let res = await fetch(url);
        let data = await res.json();
        setTxids([...data.message]);
        setPageTXs([...data.message.slice(0, 25)]);
      })();
    } else {
      setTxids([]);
    }
  }, [block]);

  React.useEffect(() => {
    if (pageTXs !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/transactions/flaggedtxs`;
        let res = await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(pageTXs),
        });
        let data = await res.json();
        setFlaggedTXs([...data.message]);
      })();
    } else {
      setFlaggedTXs([]);
    }
  }, [pageTXs]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ p: 2 }}>
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
        <Box sx={{ width: "75%", marginRight: "auto", marginLeft: "auto" }}>
          <BlockHeaderInfoComponent block={block} />
        </Box>
        <Typography variant="h5" sx={{ mb: "1rem" }} align="center">
          Transactions in Block
        </Typography>
        <Card sx={{ m: 2, width: "55%", mr: "auto", ml: "auto" }}>
          <CardContent>
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

export default BlockDetailsPage;
