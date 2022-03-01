import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../lib/hooks";

function Private({children}) {
  const [authenticated , setAuth] = useState(true)
  useEffect (() => {
    isAuthenticated().then((res) => {
      setAuth(res)
    }).catch((err) => {
      setAuth(false)
    })
  }, [])

  return authenticated ?
    children
    :
    (<Navigate to="/login" />)
}

export default Private;