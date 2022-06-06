import {checkAuth} from "./auth";

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if(token !== null) {
    let response = await checkAuth(token)
    return !!(response.data && response.data.email_verified_at)
  }
  return false;
}