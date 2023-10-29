import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && userInfo.isAdmin) {
    // Render the ShippingScreen component when the user is authenticated
    return <Outlet />;
  } else {
    // Redirect to the "login" page if the user is not authenticated
    return <Navigate to="login" replace />;
  }
};

export default AdminRoute;
