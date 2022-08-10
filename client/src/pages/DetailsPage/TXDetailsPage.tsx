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
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../../types/BitcoinTypes";
import { Tree } from "react-tree-graph";
import "./styles.css";

export interface IProps {}

const TXDetailsPage: React.FC<IProps> = () => {
  let { txid } = useParams();
  const [tx, setTx] = React.useState<Transaction | undefined>(undefined);
  const [tree, setTree] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (txid !== undefined) {
      (async () => {
        const url = `http://localhost:5010/transactions/${txid}`;
        let res = await fetch(url);
        let data = await res.json();
        setTx(data.message);
      })();
    }
  }, [txid]);

  React.useEffect(() => {
    if (tx) {
      setTree(createTree(tx));
    }
  }, [tx]);

  const createTree = (transaction: Transaction) => {
    const name = transaction.txid;
    const children = transaction.vin.map((vin: any) => {
      console.log(vin);
      try {
          return {
            name: vin["prevout"]["scriptpubkey_address"],
          };
      }
      catch (err) {
          return [];
      }
    });
    return {
      name,
      children,
    };
  };

  return (
    <div>
          <Grid>
              <Typography sx={{ m: 2 }} variant="h3" alignSelf={"center"}>
                  Transaction Details
              </Typography>
              {tx ? (
                  <Card sx={{ m: 2 }}>
                      <><Typography sx={{ m: 2 }} variant="subtitle1">{tx["txid"]}</Typography>
                          <Grid container spacing={1}>
                              <Grid item xs={6}>
                                  <Card sx={{ m: 2 }}>
                                      <TableContainer component={Paper}>
                                          <Table sx={{ minWidth: 350 }}>
                                              <TableBody>
                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Version
                                                      </TableCell>
                                                      <TableCell align="right">
                                                          {tx["version"]}
                                                      </TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Locktime
                                                      </TableCell>
                                                      <TableCell align="right">{tx["locktime"]}</TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Size
                                                      </TableCell>
                                                      <TableCell align="right">{tx["size"]}</TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Weight
                                                      </TableCell>
                                                      <TableCell align="right">{tx["weight"]}</TableCell>
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
                                                          Fee
                                                      </TableCell>
                                                      <TableCell align="right">{tx["fee"]}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                      <TableCell component="th" scope="row">
                                                          Inputs
                                                      </TableCell>
                                                      <TableCell align="right">{tx["vin"].length}</TableCell>
                                                  </TableRow>
                                                  <TableRow
                                                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                  >
                                                      <TableCell component="th" scope="row">
                                                          Outputs
                                                      </TableCell>
                                                      <TableCell align="right">{tx["vout"].length}</TableCell>
                                                  </TableRow>
                                              </TableBody>
                                          </Table>
                                      </TableContainer>
                                  </Card>
                              </Grid>
                          </Grid></>
                  </Card>
              ) : (
                  <Typography variant="body1">Loading...</Typography>
              )}
          </Grid>

      <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
        {tree ? (
          <div className="custom-container">
            <Tree
              data={tree}
              height={400}
              svgProps={{
                className: "custom",
              }}
              width={600}
            />
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </div>
    </div>
  );
};

export default TXDetailsPage;
