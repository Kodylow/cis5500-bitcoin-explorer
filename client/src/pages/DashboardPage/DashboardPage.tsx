import React from "react";
import TxsChart from './TxsChart';
import {
  Grid
} from "@mui/material";
import { TxsOverTime } from './DataTypes';
import moment from 'moment'

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = (props) => {
  const [txsData, setTxsOverTime] = React.useState<Array<TxsOverTime> | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/txsovertime")
      ).json();
      setTxsOverTime([...res.message]);
    })();
  }, []);

  if (txsData) {
    for (let txs of txsData) {
      txs['date'] = String(moment(txs['date']).utc().format('YYYY-MM-DD'));
    }
  }

  return (
    <React.Fragment>
      <Grid container sx={{mt: '3rem'}} spacing={0} justifyContent="center">
        <h2>Total Transactions over Time</h2>
        <TxsChart txsData={txsData}></TxsChart>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
