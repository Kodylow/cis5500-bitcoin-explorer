import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import blockImg from "./block-arrow.png";
import { BlockHeader } from "../../types/BitcoinTypes";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import moment from "moment";

export interface IProps {
  block: BlockHeader | undefined;
  setBlock: Dispatch<SetStateAction<BlockHeader | undefined>>;
}

const BlocksListComponent: React.FC<IProps> = ({ block, setBlock }) => {
  const [blockheaders, setBlockheaders] = React.useState<
    Array<BlockHeader> | undefined
  >(undefined);
  const [currHeight, setCurrHeight] = React.useState<number | undefined>();
  const moreBlocks = 10;

  const getMoreBlockHeaders = async () => {
    if (currHeight) {
      const res = await (
        await fetch(
          `http://www.localhost:5010/blockheaders?hstart=${
            currHeight - moreBlocks
          }&hend=${currHeight - 1}`
        )
      ).json();
      setBlockheaders([...(blockheaders || []), ...res.message]);
    }
  };

  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://www.localhost:5010/blockheaders/")
      ).json();
      setBlockheaders([...res.message]);
    })();
  }, []);

  React.useEffect(() => {
    if (blockheaders) {
      let minHeight = blockheaders[blockheaders.length - 1].height;
      setCurrHeight(minHeight);
    }
  }, [blockheaders]);

  return (
    <List
      sx={{
        height: "100vh",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        position: "sticky",
        top: ".25rem",
      }}
    >
      {blockheaders ? (
        <React.Fragment>
          {blockheaders.map((blockheader) => (
            <ListItem
              onClick={
                blockheader.hash !== block?.hash
                  ? () => setBlock(blockheader)
                  : undefined
              }
              sx={
                blockheader.hash === block?.hash
                  ? { backgroundColor: "primary.main" }
                  : {
                      "&:hover": {
                        backgroundColor: "primary.main",
                        cursor: "pointer",
                      },
                    }
              }
              key={blockheader.hash}
            >
              <ListItemAvatar>
                <div>
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
                </div>
              </ListItemAvatar>
              <ListItemText
                primary={blockheader.height}
                secondary={moment(blockheader.timestamp).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              />
            </ListItem>
          ))}
          <Button
            variant="outlined"
            sx={{
              display: "flex",
              width: "50%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: "1rem",
            }}
            onClick={getMoreBlockHeaders}
          >
            Load More
          </Button>
        </React.Fragment>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </List>
  );
};

export default BlocksListComponent;
