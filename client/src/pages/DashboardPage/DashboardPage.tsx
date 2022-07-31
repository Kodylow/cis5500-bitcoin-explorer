import Chart from "./Chart";
import React from "react";

export interface IDashboardPageProps {}

const DashboardPage: React.FC<IDashboardPageProps> = (props) => {
  return (
    <React.Fragment>
      <h1>Bitcoin Dashboard</h1>
      <Chart />
    </React.Fragment>
  );
};

export default DashboardPage;
