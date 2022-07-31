import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlocksPage from "./pages/BlocksPage/BlocksPage";
import UTXOsPage from "./pages/UTXOsPage/UTXOsPage";
import TXDetailsPage from "./pages/TXDetailsPage/TXDetailsPage";
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
            <Route path="/UTXOs" element={<UTXOsPage />} />
            <Route path="/blocks" element={<BlocksPage />} />
            <Route path="/tx/:txid" element={<TXDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
