import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../BlocksPage/BlocksTypes";

export interface IProps {}

const TXDetailsPage: React.FC<IProps> = () => {
  let { txid } = useParams();
  const [tx, setTx] = React.useState<Transaction | undefined>(undefined);

  React.useEffect(() => {
    if (txid !== undefined) {
      (async () => {
        const url = `https://blockstream.info/api/tx/${txid}`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setTx(data);
      })();
    }
  }, [txid]);
  return (
    <Grid>
      <Typography variant="h1" alignSelf={"center"}>
        TX Exploded View
      </Typography>
      {tx ? (
        <Typography variant="body1">{JSON.stringify(tx, null, 2)}</Typography>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Grid>
  );
};

export default TXDetailsPage;
