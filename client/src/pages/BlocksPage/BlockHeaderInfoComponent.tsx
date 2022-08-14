import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  Paper,
  Typography,
  Box
} from "@mui/material";
import React from "react";
import { BlockHeader } from "../../types/BitcoinTypes";
import moment from "moment";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";

export interface IProps {
  block: BlockHeader | undefined;
}

const BlockHeaderInfoComponent: React.FC<IProps> = ({ block }) => {
  // Additional block information parsing for displaying cleaned key in the table component
  return (
    <React.Fragment>
        <Typography variant="h5" sx={{ ml: "1rem", mt: "1rem" }}>
          Block Header Information
        </Typography>
      <Card sx={{ m: 2 }}>
        {block ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <Box style={{display: 'inline-block', marginLeft: '.5rem'}}>
                      <CopyToClipboardButton copiedText={block["hash"]}/>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    Merkle Root:
                  </TableCell>
                  <TableCell align="left" />
                  <TableCell align="right">{block["merkle_root"]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="h5"
            align="center"
            alignItems="center"
            sx={{ padding: "2rem" }}
          >
            Loading...
          </Typography>
        )}
      </Card>
      {block ? (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card sx={{ m: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Height
                      </TableCell>
                      <TableCell align="right">{block["height"]}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Timestamp
                      </TableCell>
                      <TableCell align="right">
                        {moment(block["timestamp"]).format(
                          "MM/DD/YYYY h:mm:ss a"
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Version
                      </TableCell>
                      <TableCell align="right">{block["version"]}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Difficulty
                      </TableCell>
                      <TableCell align="right">{block["difficulty"]}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Transactions
                      </TableCell>
                      <TableCell align="right">{block["num_tx"]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ m: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Bits
                      </TableCell>
                      <TableCell align="right">{block["bits"]}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Nonce
                      </TableCell>
                      <TableCell align="right">{block["nonce"]}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Size
                      </TableCell>
                      <TableCell align="right">{block["size"]}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Weight
                      </TableCell>
                      <TableCell align="right">{block["weight"]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

export default BlockHeaderInfoComponent;
