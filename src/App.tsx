import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ClientInfoPage from "./pages/ClientInfoPage";
import CardPaymentPage from "./pages/CardPaymentPage";
import HowToGetTokenPage from "./pages/HowToGetTokenPage";
import Header from "./components/UI/Header/Header";
import Footer from "./components/UI/Footer/Footer";

import "./App.css";

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");

  const submitToken = (token: string): void => {
    if (token && token.trim()) setToken(token);
  };

  const prepareCardNumber = (number: string): string => {
    const result: Array<string> = [];

    number.split("").forEach((num, index) => {
      if (!(index % 4)) result.push(" ");
      result.push(num);
    });

    return result.join("").trim();
  };

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage submitToken={submitToken} />} />
        <Route
          path='/clientInfo'
          element={<ClientInfoPage token={token} prepareCardNumber={prepareCardNumber} />}
        />
        <Route path='/cardInfo/:cardID' element={<CardPaymentPage token={token} />} />
        <Route path='/how-to-get-token' element={<HowToGetTokenPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
