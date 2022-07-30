// pages
import HomePage from "../pages/HomePage";
import BlocksPage from "../pages/BlocksPage/BlocksPage";
import UTXOsPage from "../pages/UTXOsPage/UTXOsPage";
import TXIDsPage from "../pages/TXIDsPage/TXIDsPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

// other
import { FC } from "react";

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
  },
  {
    key: "blocks-route",
    title: "Blocks",
    path: "/blocks",
    enabled: true,
    component: BlocksPage,
  },
  {
    key: "utxos-route",
    title: "UTXOs",
    path: "/utxos",
    enabled: true,
    component: UTXOsPage,
  },
  {
    key: "txids-route",
    title: "TXIDs",
    path: "/txids",
    enabled: true,
    component: TXIDsPage,
  },
  {
    key: "dashboard-route",
    title: "Dashboard",
    path: "/dashboard",
    enabled: true,
    component: DashboardPage,
  },
];
