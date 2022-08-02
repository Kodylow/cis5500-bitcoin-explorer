import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import React from 'react';
import { DataOverTime } from './DataTypes';
import {
  Typography
} from "@mui/material";


export interface IProps {
  timeData: Array<DataOverTime> | undefined;
  yAxisLabel: string;
}

const TimeSeriesChart: React.FC<IProps> = ({ timeData, yAxisLabel }) =>  {


  return (
    <React.Fragment>
      {
        timeData ?
        (<ResponsiveContainer width="80%" aspect={3}>
          <LineChart
            width={500}
            height={400}
            data={timeData}
            margin={{ top: 10, right: 30, left: 50, bottom: 50 }}
          >
            <XAxis
              dataKey="date"
              dy={10}
              tick={{fill:"#fff", fontSize: 14, opacity: .75}}
              label={{ value: 'Date', position: 'outsideBottomRight', fill: '#fff',  dy: 35, offset: 0, opacity: .75 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              dx={-10}
              domain={[0, 'auto']}
              label={{ value: yAxisLabel, fill: '#fff', dx: -70, angle: -90, position: 'outsideLeft', opacity: .75 }}
              tick={{fill:"#fff", fontSize: 14, opacity: .75}}
            />
            <CartesianGrid
              vertical={false}
              stroke="#aab8c2"
              opacity={.15}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1d1f31", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              cursor={false}
              label="{Date}"
              labelFormatter={(name) => 'Value : ' + name}
              formatter={(name: number) => new Intl.NumberFormat('en').format(name)}
            />
            <Line
              type="monotone"
              stroke="#268c62"
              name={yAxisLabel}
              dataKey="value"
              strokeWidth="2.5"
              dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 0,r:0}}
              activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}}
            />
          </LineChart>
        </ResponsiveContainer>)

        :

        (<Typography variant="h5" align="center" sx={{'mt': '2rem', 'mb': '2rem', 'color': '#873dec'}}>
          Loading Graph...
        </Typography>)
      }
    </React.Fragment>
  );
}

export default TimeSeriesChart;
