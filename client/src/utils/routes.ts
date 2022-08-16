// pages
import BlocksPage from "../pages/BlocksPage/BlocksPage";

import SummaryPage from "../pages/SummaryPage/SummaryPage";

// other
import { FC } from "react";
import KYCAddressesPage from "../pages/KYCAddressesPage/KYCAddressesPage";

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
    key: "kycaddresses-route",
    title: "KYC Addresses",
    path: "/kycaddresses",
    enabled: true,
    component: KYCAddressesPage,
  },
  // {
  //   key: "txids-route",
  //   title: "TXIDs",
  //   path: "/txids",
  //   enabled: true,
  //   component: TXIDsPage,
  // },
];
