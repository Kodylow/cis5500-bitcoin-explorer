import {
  Card,
  // CardContent,
  // Grid,
  // IconButton,
  // InputBase,
  // Paper,
  // Typography,
} from "@mui/material";
import React from "react";



const ChartCard = (props: any) => {
  return (
    <Card>
      {props.children}
    </Card>
  );
}

export default ChartCard;
