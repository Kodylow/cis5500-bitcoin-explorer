import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Transaction } from "./BlocksTypes";

export interface IProps {
  index: number;
  txid: string;
}

const CollapsableTransaction: React.FC<IProps> = ({ index, txid }) => {
  const [tx, setTx] = React.useState<Transaction | undefined>();

  const handleClick = () => {
    if (txid !== undefined) {
      (async () => {
        const url = `http://localhost:5010/transactions/${txid}`;
        let res = await fetch(url);
        let data = await res.json();
        setTx(data.message);
      })();
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => handleClick()} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {index} :{" "}
            <Link
              to={`/tx/${txid}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {txid}
            </Link>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {tx ? JSON.stringify(tx, null, 2) : "Loading..."}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsableTransaction;
