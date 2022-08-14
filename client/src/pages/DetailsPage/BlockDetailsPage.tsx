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
  const [pageTXs, setPageTXs] = React.useState<Array<string>>([]);
  const [txids, setTxids] = React.useState<Array<string>>([]);

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

  return (
    <Grid container sx={{width: '90%', marginRight: 'auto', marginLeft: 'auto'}}>
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

        <BlockHeaderInfoComponent block={block} />
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: "1rem" }}>
              Transactions in Block
            </Typography>
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
