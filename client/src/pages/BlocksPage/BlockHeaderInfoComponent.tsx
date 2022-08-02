import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography

} from "@mui/material";
import React from "react";
import { BlockHeader } from "./BlocksTypes";

export interface IProps {
  block: BlockHeader | undefined;
}

const BlockHeaderInfoComponent: React.FC<IProps> = ({ block }) => {
  // Additional block information parsing for displaying cleaned key in the table component
  let parsedBlock: { [key: string]: any }  = {};
  if (block) {
    let keys = Object.keys(block);
    for (let key of keys) {
      if (key === "prev_hash") {
        delete block[key];
      } else {
        let newKey = key.replace('_', '');
        console.log(newKey);
        if (newKey === "numtx") {

          newKey = "Number of Transactions"
        } else {
          newKey = newKey.slice(0, 1).toUpperCase() + newKey.slice(1);
        }
        parsedBlock[newKey] = block[key];
      }
    }
  }

  return (
    <Card sx={{ m: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {
              block ? Object.keys(parsedBlock).map((key: string, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{"textAlign": 'right'}}>
                    {parsedBlock[key]}
                  </TableCell>
                </TableRow>
              ))
              :
              <Typography variant="h5" align="center" alignItems="center" sx={{padding: '2rem'}}>
                Please select a block from the left sidebar.
              </Typography>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default BlockHeaderInfoComponent;
