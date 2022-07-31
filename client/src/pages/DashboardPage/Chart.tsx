import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';
import { TxsOverTime } from './DataTypes';

const Chart = () =>  {
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

  return (
    <React.Fragment>
      <h2>Total Number of Transactions Over Time</h2>
      <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={txsData || []}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <XAxis dataKey="date" tick={{fill:"#fff"}}/>
        <YAxis tick={{fill:"#fff"}} />
        <Tooltip contentStyle={{ backgroundColor: "#1d1f31", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
        <Line type="monotone" dataKey="num_of_txs" stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />

        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;
