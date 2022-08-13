import React from "react";
import TimeSeriesChart from "./TimeSeriesChart";
import IndicatorChart from "./IndicatorChart";
import { Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataOverTime, SingleValue } from "./DataTypes";
import moment from "moment";

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = () => {
  const [txsData, setTxsOverTime] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [difficultyData, setDifficultyData] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [btcMinedData, setBTCMinedOverTime] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [currTxsData, setCurrTxsOverTime] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [currDifficultyData, setCurrDifficultyData] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [currBTCMinedData, setCurrBTCMinedOverTime] = React.useState<
    Array<DataOverTime> | undefined
  >([]);
  const [avgWeightData, setAvgWeightData] = React.useState<
    SingleValue | undefined
  >();
  const [avgTxsData, setAvgTxsData] = React.useState<SingleValue | undefined>();
  const [avgDifficultyData, setAvgDifficultyData] = React.useState<
    SingleValue | undefined
  >();

  let initialStartDate: Date = new Date("2015-01-01");
  let initialEndDate: Date = new Date();
  initialEndDate.setMonth(initialEndDate.getMonth(), 0);
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    initialStartDate
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    initialEndDate
  );
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: initialStartDate, endDate: initialEndDate });

  // To load per block metrics
  // Since the data is averaging metrics per block between time, it needs to be recalculated based on the input dates and not dateRange
  React.useEffect(() => {
    const avg_weight_func = async () => {
      (async () => {
        setAvgWeightData(undefined);
        const res = await (
          await fetch(
            "http://www.localhost:5010/dashboard/getavgweight?startDate=" +
              moment(startDate).format("YYYY-MM-DD") +
              "&endDate=" +
              moment(endDate).format("YYYY-MM-DD")
          )
        ).json();
        setAvgWeightData(res.message[0]);
      })();
    };

    const avg_txs_func = async () => {
      (async () => {
        setAvgTxsData(undefined);
        const res = await (
          await fetch(
            "http://www.localhost:5010/dashboard/getavgtxs?startDate=" +
              moment(startDate).format("YYYY-MM-DD") +
              "&endDate=" +
              moment(endDate).format("YYYY-MM-DD")
          )
        ).json();
        setAvgTxsData(res.message[0]);
      })();
    };

    const avg_difficulty_func = async () => {
      (async () => {
        setAvgDifficultyData(undefined);
        const res = await (
          await fetch(
            "http://www.localhost:5010/dashboard/getavgdifficulty?startDate=" +
              moment(startDate).format("YYYY-MM-DD") +
              "&endDate=" +
              moment(endDate).format("YYYY-MM-DD")
          )
        ).json();
        setAvgDifficultyData(res.message[0]);
      })();
    };

    Promise.all([
      avg_weight_func(),
      avg_txs_func(),
      avg_difficulty_func(),
    ]).then(() => {
      console.log("done");
    });
  }, [startDate, endDate]);

  React.useEffect(() => {
    const tx_func = async () => {
      setTxsOverTime(undefined);
      const res = await (
        await fetch(
          "http://www.localhost:5010/dashboard/txsovertime?startDate=" +
            moment(dateRange.startDate).format("YYYY-MM-DD") +
            "&endDate=" +
            moment(dateRange.endDate).format("YYYY-MM-DD")
        )
      ).json();
      setTxsOverTime([...res.message]);
      setCurrTxsOverTime([...res.message]);
    };
    const difficulty_func = async () => {
      setDifficultyData(undefined);
      const res = await (
        await fetch(
          "http://www.localhost:5010/dashboard/difficultybymonth?startDate=" +
            moment(dateRange.startDate).format("YYYY-MM-DD") +
            "&endDate=" +
            moment(dateRange.endDate).format("YYYY-MM-DD")
        )
      ).json();
      setDifficultyData([...res.message]);
      setCurrDifficultyData([...res.message]);
    };
    const btc_func = async () => {
      setBTCMinedOverTime(undefined);
      const res = await (
        await fetch(
          "http://www.localhost:5010/dashboard/btcminedovertime?startDate=" +
            moment(dateRange.startDate).format("YYYY-MM-DD") +
            "&endDate=" +
            moment(dateRange.endDate).format("YYYY-MM-DD")
        )
      ).json();
      setBTCMinedOverTime([...res.message]);
      setCurrBTCMinedOverTime([...res.message]);
    };

    Promise.all([tx_func(), difficulty_func(), btc_func()]).then(() => {
      console.log("done");
    });
  }, [dateRange]);

  if (txsData) {
    for (let txs of txsData) {
      txs["date"] = String(moment(txs["date"]).format("YYYY-MM-DD"));
      txs["value"] = Number(txs["value"]);
    }
  }

  if (difficultyData) {
    for (let difficulty of difficultyData) {
      difficulty["date"] = String(
        moment(difficulty["date"]).format("YYYY-MM-DD")
      );
      difficulty["value"] = Number(difficulty["value"]);
    }
  }

  if (btcMinedData) {
    for (let btcMined of btcMinedData) {
      btcMined["date"] = String(moment(btcMined["date"]).format("YYYY-MM-DD"));
      btcMined["value"] = Number(btcMined["value"]);
    }
  }

  React.useEffect(() => {
    if (txsData) {
      setCurrTxsOverTime(
        txsData.filter(
          (x) =>
            moment(x.date).isSameOrAfter(startDate) &&
            moment(x.date).isSameOrBefore(endDate)
        )
      );
    }
    if (difficultyData) {
      setCurrDifficultyData(
        difficultyData.filter(
          (x) =>
            moment(x.date).isSameOrAfter(startDate) &&
            moment(x.date).isSameOrBefore(endDate)
        )
      );
    }
    if (btcMinedData) {
      setCurrBTCMinedOverTime(
        btcMinedData.filter(
          (x) =>
            moment(x.date).isSameOrAfter(startDate) &&
            moment(x.date).isSameOrBefore(endDate)
        )
      );
    }
  }, [startDate, endDate, txsData, difficultyData, btcMinedData]);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="flex-start"
        sx={{ mt: "2.5rem", mx: "auto" }}
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
                if (newValue && startDate) {
                  if (moment(newValue) < moment(dateRange.startDate)) {
                    setDateRange({
                      startDate: newValue!,
                      endDate: dateRange.endDate,
                    });
                  }
                  setStartDate(newValue!);
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={4} md={2.5} lg={2} sx={{ ml: "1rem" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              renderInput={(params) => <TextField {...params} />}
              value={endDate}
              onChange={(newValue) => {
                if (newValue && endDate) {
                  if (moment(newValue) > moment(dateRange.endDate)) {
                    setDateRange({
                      startDate: dateRange.startDate,
                      endDate: newValue!,
                    });
                  }
                  setEndDate(newValue!);
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item />
      </Grid>

      <Grid
        container
        sx={{
          mt: "3rem",
          mb: "3rem",
          display: "flex",
          justifyContent: "space-around",
          mr: "auto",
          ml: "auto",
        }}
        width="90%"
      >
        <IndicatorChart
          data={avgWeightData}
          measureName="Average Weight per Block"
        />
        <IndicatorChart
          data={avgTxsData}
          measureName="Average Transactions per Block"
        />
        <IndicatorChart
          data={avgDifficultyData}
          measureName="Average Difficulty per Block (in Trillions)"
        />
      </Grid>
      <Grid
        container
        sx={{ mt: "3rem", display: "flex", flexDirection: "column" }}
        spacing={0}
        alignItems="center"
      >
        <React.Fragment>
          <Typography variant="h5">Total Transactions by Month</Typography>
          <TimeSeriesChart
            timeData={currTxsData}
            yAxisLabel="Total Transactions"
          ></TimeSeriesChart>
        </React.Fragment>
        <React.Fragment>
          <Typography variant="h5" sx={{ mt: "1.5rem" }}>
            Difficulty by Month (in Trillion)
          </Typography>
          <TimeSeriesChart
            timeData={currDifficultyData}
            yAxisLabel="Difficulty"
          ></TimeSeriesChart>
        </React.Fragment>
        <React.Fragment>
          <Typography variant="h5" sx={{ mt: "1.5rem" }}>
            Total BTC Mined by Year
          </Typography>
          <TimeSeriesChart
            timeData={currBTCMinedData}
            yAxisLabel="Total BTC Mined"
          ></TimeSeriesChart>
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
