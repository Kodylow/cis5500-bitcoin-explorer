import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../BlocksPage/BlocksTypes";
import { Tree } from "react-tree-graph";
import "./styles.css";

export interface IProps {}

const AddressDetailsPage: React.FC<IProps> = () => {
  let { address } = useParams();
  const [addr, setAddr] = React.useState<Transaction | undefined>(undefined);
  // const [tree, setTree] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (address !== undefined) {
      (async () => {
        const url = `https://blockstream.info/api/address/${address}`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setAddr(data);
      })();
    }
  }, [address]);

  return (
    <div>
      <Grid>
        <Typography variant="h1" alignSelf={"center"}>
          Address Exploded View
        </Typography>
        {addr ? (
          <Typography variant="body1">
            {JSON.stringify(addr, null, 2)}
          </Typography>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default AddressDetailsPage;
