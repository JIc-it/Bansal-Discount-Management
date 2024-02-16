import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import AllRouting from "./components/allRouting";
import SideMenu from "./components/common/sideMenu";
import "./App.css";
import Login from "./components/auth/login";
import ForgotPassword from "./components/auth/forgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromotionsHistory from "./components/promo/promotionsHistory";
import Footer from "./components/common/footer";
import { getProfileRequest } from "./axiosHandle/profileHandle";
import { getPermission } from "./axiosHandle/commonServicesHandle";
import { useState } from "react";
import AppContextProvider from "./contexts/AppContext";
import MainPage from "./pages/MainPage";
import PrivacyPolicy from "./components/forgotPasswordPolicy";
import "../src/Styles/global.scss";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import EmailVerificationCode from "./components/auth/EmailVerificationCode";

function App() {
  return (
    <div
      id="app"
      style={{
        display: "flex",
        flexDirection: "column",
        // marginTop: '60px'
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verification/:id" element={<EmailVerificationCode />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
