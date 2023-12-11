import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PrivateComponent from "./components/login/PrivateComponent";
import Login from "./components/login/Login";
import Home from "./pages/Home";
import Sidebar from "./components/common/Sidebar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Register from "./components/login/Register";
import StatisticPage from "./pages/StatisticPage";
import View from "./pages/View";
import AccessControl from "./pages/AccessControl";
import ForgotPassword from "./components/login/ForgotPassword";
import QRInfo from "./pages/QRInfo";
import CreateDynamicQr from "./pages/CreateDynamicQr";
import DynamicQr from "./pages/DynamicQr";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import FormBuilderSidebar from "./components/FormBuilder/FormBuilderSidebar";

export default function RoutingComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateComponent />}>
          <Route path="/" element={<Sidebar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/qr-info" element={<QRInfo />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/create-dynamic" element={<CreateDynamicQr />} />
            <Route path="/qr-builder" element={<FormBuilderSidebar />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/view" element={<View />} />
            <Route path="/statistic/:id" element={<StatisticPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accessControl" element={<AccessControl />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dynamic-qr/:id" element={<DynamicQr />} />
      </Routes>
    </BrowserRouter>
  );
}
