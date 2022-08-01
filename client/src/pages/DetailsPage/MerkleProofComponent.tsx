import { Grid, Typography } from "@mui/material";
import React from "react";
import "./styles.css";

export interface IProps {
  txid: string | undefined;
}

const MerkleProof: React.FC<IProps> = ({ txid }) => {
  const [merkleproof, setMerkleproof] = React.useState<String[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (txid !== undefined) {
      (async () => {
        const url = `http://localhost.com:5010/tx/${txid}/merkle-proof`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data.message);
        setMerkleproof(data.message);
      })();
    }
  }, [txid]);

  //const createMerkleTree = async (txid: string) => {};

  return (
    <div id="merkleTree" style={{ width: "50em", height: "20em" }}>
      {merkleproof ? (
        merkleproof
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
};

export default MerkleProof;
