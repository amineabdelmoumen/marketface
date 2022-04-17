import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../lib/hooks";

import { Navigate } from "react-router-dom";
export default function PrivateProfil({ children }) {
  const [authenticated, setAuth] = useState(false);

  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        setAuth(res);
      })
      .catch((err) => {
        setAuth(false);
      });
  }, []);

  return authenticated ? <Navigate to="/profil" /> : children;
}
