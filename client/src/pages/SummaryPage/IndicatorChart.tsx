import React from 'react';
import {
  Typography,
  Card,
  CardContent
} from "@mui/material";
import { SingleValue } from './DataTypes';


export interface IProps {
  data: SingleValue | undefined;
  measureName: string;
}

const IndicatorChart: React.FC<IProps> = ({ data, measureName }) =>  {
  if (data) console.log(data.value);
  return (
    <Card sx={{mb: '1.5rem',  width: "250px", backgroundColor: '#191b2d'}}>
      <CardContent>
        <Typography variant="h6" align="center" sx={{letterSpacing: '1px', color: '#4968b8', borderBottom: '1px solid #353848'}}>{measureName}</Typography>
        <Typography variant="h6" align="center" sx={{fontSize: '1.75rem'}}>{ data ? data.value : "Loading..." }</Typography>
      </CardContent>
    </Card>
  )
}

export default IndicatorChart;
