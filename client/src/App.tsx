import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about"></Route>
        <Route path="/layout" element={<LayoutComponent />}>
          <Route index element={<AboutPage />} />
          <Route path=":number" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
