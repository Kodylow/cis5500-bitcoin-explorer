import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import SquareIcon from "@mui/icons-material/Square";
import { BlockHeader } from "./BlocksTypes";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
} from "@mui/material";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

export interface IProps {
  block: BlockHeader | null;
  setBlock: Dispatch<SetStateAction<BlockHeader | null>>;
}

const BlocksListComponent: React.FC<IProps> = ({ block, setBlock }) => {
  const [blockheaders, setBlockheaders] =
    React.useState<Array<BlockHeader> | null>(null);

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
        height: "87vh",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
      {blockheaders ? (
        <div>
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
                <Avatar>
                  <SquareIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={blockheader.height}
                secondary={blockheader.timestamp}
              />
            </ListItem>
          ))}
        </div>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </List>
  );
};

export default BlocksListComponent;