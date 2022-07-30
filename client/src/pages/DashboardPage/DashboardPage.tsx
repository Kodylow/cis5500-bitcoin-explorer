import LineChart from "./LineChart";
import React from "react";

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = (props) => {
  return (
    <React.Fragment>
      <h1>Bitcoin Dashboard</h1>
      <LineChart />
    </React.Fragment>
  );
};

export default DashboardPage;
