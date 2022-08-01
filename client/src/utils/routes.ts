// pages
import BlocksPage from "../pages/BlocksPage/BlocksPage";
import UTXOsPage from "../pages/UTXOsPage/UTXOsPage";
import TXIDsPage from "../pages/DetailsPage/TXDetailsPage";
import SummaryPage from "../pages/SummaryPage/SummaryPage";

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
    component: SummaryPage,
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
  // {
  //   key: "txids-route",
  //   title: "TXIDs",
  //   path: "/txids",
  //   enabled: true,
  //   component: TXIDsPage,
  // },
];
