import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlocksPage from "./pages/BlocksPage/BlocksPage";
import KYCAddressesPage from "./pages/KYCAddressesPage/KYCAddressesPage";
import CoinbaseTXsPage from "./pages/CoinbaseTXsPage/CoinbaseTXsPage";
import TXDetailsPage from "./pages/DetailsPage/TXDetailsPage";
import AddressDetailsPage from "./pages/DetailsPage/AddressDetailsPage";
import { CssBaseline } from "@mui/material";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
export interface IAppProps {}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC<IAppProps> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SummaryPage />} />
            <Route path="/blocks" element={<BlocksPage />} />
            <Route path="/kycaddresses" element={<KYCAddressesPage />} />
            <Route path="/coinbasetxs" element={<CoinbaseTXsPage />} />
            <Route path="/tx/:txid" element={<TXDetailsPage />} />
            <Route path="/address/:address" element={<AddressDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
