import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlocksPage from "./pages/BlocksPage/BlocksPage";
import UTXOsPage from "./pages/UTXOsPage/UTXOsPage";
import TXIDsPage from "./pages/TXIDsPage/TXIDsPage";
import { CssBaseline } from "@mui/material";
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
            <Route index element={<HomePage />} />
            <Route path="/UTXOs" element={<UTXOsPage />} />
            <Route path="/blocks" element={<BlocksPage />} />
            <Route path="/txids" element={<TXIDsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
