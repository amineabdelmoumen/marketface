import { Routes, Route } from "react-router-dom";
import Signup from "./views/signup"; // load view
import CompanySetting from "./views/company-setting";
import Save from "./views/company-setting/save";
import Private from "./components/Private";
import Login from "./views/login";
import Profil from "./views/profil/profil";
import "./assets/scss/main.scss";
import { useEffect } from "react";
import "./assets/css/normalize.css";
import ResetPassword from "./views/reset-password";
import PrivateProfil from "./components/privateProfil";
import PageLoading from "./components/PageLoading";

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <PrivateProfil>
              <PageLoading />
              <Login />
            </PrivateProfil>
          }
        />
        <Route
          path="/company-setting"
          element={
            <Private>
              <CompanySetting />{" "}
            </Private>
          }
        />
        <Route
          path="/profil"
          element={
            <Private>
              <Profil />
            </Private>
          }
        />

        <Route path="/company-setting/save" element={<Save />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
