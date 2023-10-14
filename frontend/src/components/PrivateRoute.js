import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import ShippingScreen from "../screens/ShippingScreen";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    // Render the ShippingScreen component when the user is authenticated
    return <ShippingScreen />;
  } else {
    // Redirect to the "login" page if the user is not authenticated
    return <Navigate to="login" replace />;
  }
};

export default PrivateRoute;
