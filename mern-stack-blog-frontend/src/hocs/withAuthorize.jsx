import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { pageUrls } from "../constants/pageUrls";

export const Wrapper = ({ children, roles }) => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  console.log("userState", userState)

  if (roles.includes(userState.userInfo.user.role)) {
    return <Fragment>{children}</Fragment>;
  }
  return <Navigate to={pageUrls.NOT_FOUND}/>;
};

function WithAuthorize({ children, roles }) {
  return <Wrapper roles={roles}>{children}</Wrapper>;
}

export default WithAuthorize;
