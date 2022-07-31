import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { BlockHeader } from "./BlocksTypes";

export interface IProps {
  block: BlockHeader | undefined;
}

const BlockHeaderInfoComponent: React.FC<IProps> = ({ block }) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5">Block Header Info</Typography>
        {block ? (
          <Typography variant="body1" key={block.hash}>
            {JSON.stringify(block, null, 2)}
          </Typography>
        ) : (
          <div>: none</div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockHeaderInfoComponent;
