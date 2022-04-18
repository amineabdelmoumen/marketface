import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../lib/hooks";

import { Navigate } from "react-router-dom";
export default function PrivateProfil({ children }) {
  const [authenticated, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [PageLoading, Login] = children;
  console.log(PageLoading);
  useEffect(() => {
    isAuthenticated()
      .then((res) => {
        setAuth(res);
        setLoading(false);
      })
      .catch((err) => {
        setAuth(false);
        setLoading(false);
      });
  }, []);

  return authenticated ? (
    loading == true ? (
      PageLoading
    ) : (
      <Navigate to="/profil" />
    )
  ) : loading == true ? (
    PageLoading
  ) : (
    Login
  );
}
