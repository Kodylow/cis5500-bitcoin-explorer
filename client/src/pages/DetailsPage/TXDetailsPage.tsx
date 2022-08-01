import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../BlocksPage/BlocksTypes";
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
      return {
        name: vin.prevout.scriptpubkey_address,
      };
    });
    return {
      name,
      children,
    };
  };

  return (
    <div>
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
