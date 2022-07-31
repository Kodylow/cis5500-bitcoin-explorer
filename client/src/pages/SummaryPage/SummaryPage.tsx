import React from "react";
import TimeSeriesChart from './TimeSeriesChart';
import {
  Grid
} from "@mui/material";
import { DataOverTIme } from './DataTypes';
import moment from 'moment'

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = () => {
  const [txsData, setTxsOverTime] = React.useState<Array<DataOverTIme> | undefined>(undefined);
  const [difficultyData, setDifficultyData] = React.useState<Array<DataOverTIme> | undefined>(undefined);

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

  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/diffcultybymonth")
      ).json();
      setDifficultyData([...res.message]);
    })();
  }, []);

  if (txsData) {
    for (let txs of txsData) {
      txs['date'] = String(moment(txs['date']).utc().format('YYYY-MM-DD'));
    }
  }

  // const [btcMinedData, setBTCMinedOverTime] =  React.useState<Array<DataOverTIme> | undefined>(undefined);
  // React.useEffect(() => {
  //   (async () => {
  //     const res = await (
  //       await fetch("http://www.localhost:5010/dashboard/btcminedovertime")
  //     ).json();
  //     setBTCMinedOverTime([...res.message]);
  //   })();
  // }, []);

  // if (btcMinedData) {
  //   for (let btcMined of btcMinedData) {
  //     btcMined['date'] = String(moment(btcMined['date']).utc().format('YYYY-MM-DD'));
  //   }
  // }

  return (
    <React.Fragment>
      <Grid container sx={{mt: '3rem'}} spacing={0} justifyContent="center">
        <h2>Total Transactions by Month</h2>
        <TimeSeriesChart timeData={txsData} yAxisLabel="Total Transactions"></TimeSeriesChart>
        <h2>Difficulty by Month (in Trillion)</h2>
        <TimeSeriesChart timeData={difficultyData} yAxisLabel="Difficulty in Trillion"></TimeSeriesChart>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
