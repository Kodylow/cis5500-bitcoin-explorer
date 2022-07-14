import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Layout/theme";
import BlocksPage from "./pages/BlocksPage";
import UTXOsPage from "./pages/UTXOsPage";

export interface IAppProps {}

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
