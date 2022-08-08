import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { BlockHeader } from "../../types/BitcoinTypes";
import { Tree } from "react-tree-graph";
import "./styles.css";

export interface IProps {}

const BlockDetailsPage: React.FC<IProps> = () => {
  let { blockheight } = useParams();
  const [block, setBlock] = React.useState<BlockHeader | undefined>(undefined);
  // const [tree, setTree] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (blockheight !== undefined) {
      (async () => {
        const url = `http://localhost:5010/blockheaders/${blockheight}`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setBlock(data);
      })();
    }
  }, [blockheight]);

  return (
    <div>
      <Grid>
        <Typography variant="h1" alignSelf={"center"}>
          Block Exploded View
        </Typography>
        {block ? (
          <Typography variant="body1">
            {JSON.stringify(block, null, 2)}
          </Typography>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default BlockDetailsPage;
