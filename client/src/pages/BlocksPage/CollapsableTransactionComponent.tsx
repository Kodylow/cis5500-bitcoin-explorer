import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Transaction } from "../../types/BitcoinTypes";
import TransactionHeaderInfoComponent from "./TransactionHeaderInfoComponent";
import { makeStyles, createStyles } from '@mui/styles';

export interface IProps {
  index: number;
  txid: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    'accordion-border-radius': {
      borderBottomLeftRadius: "0 !important",
      borderBottomRightRadius: "0 !important",
    }
  }),
);


const CollapsableTransaction: React.FC<IProps> = ({ index, txid }) => {
  const [tx, setTx] = React.useState<Transaction | undefined>();
  const classes = useStyles();

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
      <Accordion
        onClick={() => handleClick()}
        className={classes['accordion-border-radius']}
        sx={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: '.25rem', outline: 'none'}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => handleClick()} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            <Link
              to={`/tx/${txid}`}
              style={{ textDecoration: "none", color: "#00ccff" }}
            >
              {txid}
            </Link>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tx ? (
            <TransactionHeaderInfoComponent transaction={tx} />
          ) : (
            <Typography variant="h5">Loading...</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsableTransaction;
