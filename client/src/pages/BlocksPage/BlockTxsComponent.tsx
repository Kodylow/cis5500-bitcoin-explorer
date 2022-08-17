import {
  TableRow,
  TableContainer,
  Table,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import CollapsableTransaction from "./CollapsableTransactionComponent";

export interface IProps {
  txids: string[];
  page: number;
}

const BlockTxsComponent: React.FC<IProps> = ({ txids, page }) => {
  const [flagged, setFlagged] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (txids !== undefined) {
      (async () => {
        const url = `http://www.localhost:5010/transactions/flaggedtxs`;
        let res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(txids),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        if (data.message.length > 0) {
          setFlagged(data.message.map((tx: { txid: string }) => tx.txid));
        } else {
          setFlagged(data.message);
        }
      })();
    } else {
      setFlagged([]);
    }
  }, [txids]);
  return (
    <Grid sx={{ position: "sticky", top: "0" }}>
      {txids.length ? (
        <TableContainer component={Paper}>
          <Table>
            <tbody>
              {txids.map((txid, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: ".5px rgba(255, 255, 255, 0.5) solid" }}
                  >
                    <CollapsableTransaction
                      index={index + (page - 1) * 25}
                      txid={txid}
                      flagged={flagged.includes(txid)}
                    />
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default BlockTxsComponent;
