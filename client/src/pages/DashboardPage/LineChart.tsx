
import React from "react";
import Plot from 'react-plotly.js';
import { TxsOverTime } from './DataTypes';

const BarChart = () =>  {
  const [txsData, setTxsOverTime] = React.useState<Array<TxsOverTime> | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://www.localhost:5010/dashboard/txsovertime")
      ).json();
      setTxsOverTime([...res.message]);
    })();
  }, []);

  console.log(txsData);
  let dates;
  let txs;

  if (txsData) {
    dates = txsData.map(el => el['date']);
    txs = txsData.map(el => el['num_of_txs']);
  }

  console.log(dates);

  return (
  <Plot
    data={[
      {
        x: dates,
        y: txs,
        type: 'scatter'
      }
    ]}
    layout={ {width: 800, height: 400, title: 'Transactions over Time'} }
    />
  );
}

export default BarChart;
