import { Card, Grid, Link, Box } from "@mui/material";
import React from "react";
import { Transaction, VinAddress } from "../../types/BitcoinTypes";
import arrowImg from "./arrow.png";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "text-bubble": {
      padding: "1rem 2rem",
      borderRadius: "15px",
      backgroundColor: "#16181c",
      marginBottom: "1rem",
    },
  })
);

export interface IProps {
  tx: Transaction;
  vins: Array<VinAddress> | undefined;
}

const InputOutputComponent: React.FC<IProps> = ({ tx, vins }) => {
  const classes = useStyles();
  const [flagged, setFlagged] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (vins !== undefined) {
      (async () => {
        let addrs = vins
          .map((vin) => vin.address)
          .concat(tx.vout.map((vout) => vout.scriptpubkey_address));
        const url = `http://www.localhost:5010/address/flaggedaddrs`;
        let res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(addrs),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();

        if (data.message.length > 0) {
          alert("TX contains KYCed addresses!!!!");
          setFlagged(data.message);
        } else {
          setFlagged(data.message);
        }
      })();
    } else {
      setFlagged([]);
    }
  }, [vins, tx]);

  return (
    <Box style={{ marginBottom: "2rem" }}>
      <Card sx={{ mb: "1.5rem", backgroundColor: "#1e1e1e" }}>
        <Grid
          container
          wrap="wrap"
          spacing={2}
          sx={{
            p: 2,
            backgroundColor: "#1e1e1e",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={5} sx={{ marginTop: "1rem" }}>
            {vins
              ? vins.map((vin) => (
                  <div
                    style={{ display: "flex", alignItems: "flex-start" }}
                    className={classes["text-bubble"]}
                    key={vin.address}
                  >
                    <div
                      style={{
                        width: "70%",
                        wordWrap: "break-word",
                        marginRight: "1rem",
                      }}
                    >
                      {vin && vin.address === "Coinbase" ? (
                        "Coinbase"
                      ) : (
                        <Link
                          href={`/address/${vin["address"]}`}
                          style={{
                            textDecoration: "none",
                            color: !flagged.includes(vin.address)
                              ? "#00ccff"
                              : "red",
                            fontSize: "1rem",
                          }}
                        >
                          {vin.address}
                        </Link>
                      )}
                    </div>
                    <div
                      style={{
                        width: "30%",
                        wordWrap: "break-word",
                        textAlign: "right",
                      }}
                    >
                      {vin.value / 100000000 + " BTC"}
                    </div>
                  </div>
                ))
              : ""}
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "25px",
                width: "auto",
                mr: ".55rem",
                display: "flex",
                justifyContent: "center",
              }}
              alt="Arrow img"
              src={arrowImg}
            />
          </Grid>
          <Grid item xs={5} sx={{ marginTop: "1rem" }}>
            {tx
              ? tx.vout.map((output) => (
                  <div
                    style={{ display: "flex", alignItems: "flex-start" }}
                    className={classes["text-bubble"]}
                    key={output.scriptpubkey_address}
                  >
                    <div
                      style={{
                        width: "70%",
                        wordWrap: "break-word",
                        marginRight: "1rem",
                      }}
                    >
                      {output.scriptpubkey_address ? (
                        <Link
                          href={`/address/${output["scriptpubkey_address"]}`}
                          style={{
                            textDecoration: "none",
                            color: !flagged.includes(
                              output.scriptpubkey_address
                            )
                              ? "#00ccff"
                              : "red",
                            fontSize: "1rem",
                          }}
                        >
                          {output["scriptpubkey_address"]}
                        </Link>
                      ) : (
                        output.scriptpubkey_type.toUpperCase()
                      )}
                    </div>
                    <div
                      style={{
                        width: "30%",
                        wordWrap: "break-word",
                        textAlign: "right",
                      }}
                    >
                      {output.value / 100000000 + " BTC"}
                    </div>
                  </div>
                ))
              : ""}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default InputOutputComponent;
