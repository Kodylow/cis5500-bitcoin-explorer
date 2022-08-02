import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { BlockHeader } from "./BlocksTypes";

export interface IProps {
  block: BlockHeader | undefined;
}

const BlockHeaderInfoComponent: React.FC<IProps> = ({ block }) => {
  // Additional block information parsing for displaying cleaned key in the table component

  return (
    <Card sx={{ m: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {block ? (
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Hash:
                </TableCell>
                <TableCell component="th" scope="row" />
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  {block["hash"]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Merkle Root:
                </TableCell>
                <TableCell component="th" scope="row" />
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  {block["merkle_root"]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "left" }}
                >
                  Timestamp: {block["timestamp"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Version: {block["version"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Difficulty: {block["difficulty"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "left" }}
                >
                  Difficulty: {block["difficulty"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Bits: {block["bits"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Nonce: {block["nonce"]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "left" }}
                >
                  Size: {block["size"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Weight: {block["weight"]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "right" }}
                >
                  Confirmations: {block["confirmations"]}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <Typography
              variant="h5"
              align="center"
              alignItems="center"
              sx={{ padding: "2rem" }}
            >
              Please select a block from the left sidebar.
            </Typography>
          )}
        </Table>
      </TableContainer>
    </Card>
  );
};

export default BlockHeaderInfoComponent;
