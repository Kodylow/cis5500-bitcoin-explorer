import React from "react";
import TimeSeriesChart from './TimeSeriesChart';
import {
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DataOverTime } from './DataTypes';
import moment from 'moment'
import LoadingGraph from './LoadingGraph';

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = () => {
  const [txsData, setTxsOverTime] = React.useState<Array<DataOverTime>  | undefined>([]);
  const [difficultyData, setDifficultyData] = React.useState<Array<DataOverTime> | undefined>([]);
  const [btcMinedData, setBTCMinedOverTime] =  React.useState<Array<DataOverTime> | undefined>([]);

  let initalStartDate: Date = new Date("2015-01-01");
  let initalEndDate: Date = new Date();
  const [startDate, setStartDate] = React.useState<Date | undefined>(initalStartDate);
  const [endDate, setEndDate] = React.useState<Date | undefined>(initalEndDate);

  React.useEffect(() => {
    (async () => {
      setTxsOverTime(undefined);
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/txsovertime?startDate=" + moment(startDate).format("YYYY-MM-DD") + "&endDate=" + moment(endDate).format("YYYY-MM-DD"))
      ).json();
      setTxsOverTime([...res.message]);
    })();
  }, [startDate, endDate]);

  if (txsData) {
    for (let txs of txsData) {
      txs['date'] = String(moment(txs['date']).format('YYYY-MM-DD'));
      txs['value'] = Number(txs['value']);
    }
  }

  React.useEffect(() => {
    (async () => {
      setDifficultyData(undefined);
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/diffcultybymonth?startDate=" + moment(startDate).format("YYYY-MM-DD") + "&endDate=" + moment(endDate).format("YYYY-MM-DD"))
      ).json();
      setDifficultyData([...res.message]);
    })();
  }, [startDate, endDate]);

  if (difficultyData) {
    for (let difficulty of difficultyData) {
      difficulty['date'] = String(moment(difficulty['date']).format('YYYY-MM-DD'));
      difficulty['value'] = Number(difficulty['value']);
    }
  }

  React.useEffect(() => {
    (async () => {
      setBTCMinedOverTime(undefined);
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/btcminedovertime?startDate=" + moment(startDate).format("YYYY-MM-DD") + "&endDate=" + moment(endDate).format("YYYY-MM-DD"))
      ).json();
      setBTCMinedOverTime([...res.message]);
    })();
  }, [startDate, endDate]);

  if (btcMinedData) {
    for (let btcMined of btcMinedData) {
      btcMined['date'] = String(moment(btcMined['date']).format('YYYY-MM-DD'));
      btcMined['value'] = Number(btcMined['value'])
    }
  }

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="flex-start"
        sx={{'mt': '2.5rem', 'mx': 'auto'}}
        width="90%"
        spacing={0}
      >
        <Grid item xs={4} sm={4} md={2.5} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              renderInput={(params) => <TextField {...params} />}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue!);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={4} md={2.5} lg={2} sx={{'ml': '1rem'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              renderInput={(params) => <TextField {...params} />}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue!);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item/>
      </Grid>

      <Grid container sx={{mt: '3rem', display: 'flex', flexDirection: 'column'}} spacing={0} alignItems="center">
        <React.Fragment>
          <Typography variant="h5">Total Transactions by Month</Typography>
          <TimeSeriesChart timeData={txsData} yAxisLabel="Total Transactions"></TimeSeriesChart>
        </React.Fragment>
        <React.Fragment>
          <Typography variant="h5" sx={{'mt': '1.5rem'}}>Difficulty by Month (in Trillion)</Typography>
          <TimeSeriesChart timeData={difficultyData} yAxisLabel="Difficulty"></TimeSeriesChart>
        </React.Fragment>
        <React.Fragment>
          <Typography variant="h5" sx={{'mt': '1.5rem'}}>Total BTC Mined by Year</Typography>
          <TimeSeriesChart timeData={btcMinedData} yAxisLabel="Total BTC Mined"></TimeSeriesChart>
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
