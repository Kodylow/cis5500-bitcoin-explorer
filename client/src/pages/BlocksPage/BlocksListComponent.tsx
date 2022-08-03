import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import blockImg from "./block.png";
import { BlockHeader } from "./BlocksTypes";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import moment from 'moment';

export interface IProps {
  block: BlockHeader | undefined;
  setBlock: Dispatch<SetStateAction<BlockHeader | undefined>>;
}

const BlocksListComponent: React.FC<IProps> = ({ block, setBlock }) => {
  const [blockheaders, setBlockheaders] = React.useState<
    Array<BlockHeader> | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://www.localhost:5010/blockheaders/")
      ).json();
      setBlockheaders([...res.message]);
    })();
  }, []);

  return (
    <List
      sx={{
        height: "100vh",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        position: 'sticky',
        top: '.25rem',
      }}
    >
      {blockheaders ? (
        <React.Fragment>
          {blockheaders.map((blockheader) => (
            <ListItem
              onClick={() => setBlock(blockheader)}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.main",
                  cursor: "pointer",
                },
              }}
              key={blockheader.hash}
            >
              <ListItemAvatar>
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
              </ListItemAvatar>
              <ListItemText
                primary={blockheader.height}
                secondary={moment(blockheader.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              />
            </ListItem>
          ))}
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
