import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";

export interface ILayoutComponentProps {}

const LayoutComponent: React.FC<ILayoutComponentProps> = (props) => {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LayoutComponent;
