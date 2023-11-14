import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PrivateComponent from "./components/login/PrivateComponent";
import Login from "./components/login/Login";
import Home from "./pages/Home";
import Sidebar from "./components/common/Sidebar";
import Profile from "./components/common/Profile";
import Settings from "./components/common/Settings";
import Register from "./components/login/Register";
import Create from "./pages/Create";
import View from "./pages/View";
import AccessControl from "./components/common/AccessControl";
import ForgotPassword from "./components/login/ForgotPassword";
import QRInfo from "./pages/QRInfo";
import CreateDynamicQr from "./pages/CreateDynamicQr";
import DynamicQr from "./components/common/DynamicQr";

export default function RoutingComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateComponent />}>
          <Route path="/" element={<Sidebar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/qr-info" element={<QRInfo />} />
            <Route path="/create" element={<Create type={"new"} />} />
            <Route path="/create-dynamic" element={<CreateDynamicQr />} />
            <Route path="/edit/:id" element={<Create type={"edit"} />} />
            <Route path="/view" element={<View />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accessControl" element={<AccessControl />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/dynamic-qr/:id" element={<DynamicQr />} />
      </Routes>
    </BrowserRouter>
  );
}
