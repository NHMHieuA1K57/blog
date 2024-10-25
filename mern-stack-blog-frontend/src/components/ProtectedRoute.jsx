
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { pageUrls } from "../constants/pageUrls";

function ProtectedRoute({ children }) {
  const userState = useSelector((state) => state.user);
  if (userState.userInfo) return children ? children : <Outlet />;

  return <Navigate to={pageUrls.LOGIN} replace />;
}

export default ProtectedRoute;
