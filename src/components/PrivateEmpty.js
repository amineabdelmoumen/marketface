import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/hooks";
import { useSelector } from "react-redux";
const PrivateEmpty = ({ children }) => {
  const [authenticated, setAuth] = useState(true);

  const identite = useSelector((state) => state.profile.identite);
  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        setAuth(res);
      })
      .catch((err) => {
        setAuth(false);
      });
  }, []);

  if (authenticated) {
    if (Object.keys(identite).length === 0) {
      return <Navigate to="/company-setting" />;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/" />;
  }
};
export default PrivateEmpty;
