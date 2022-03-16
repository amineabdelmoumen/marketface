import { Routes, Route } from "react-router-dom";
import Signup from "./views/signup"; // load view
import CompanySetting from "./views/company-setting";
import Save from "./views/company-setting/save";
import Private from "./components/Private";
import Login from "./views/login";
import Profil from "./views/profil/profil";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company-setting" element={<Private><CompanySetting /> </Private>} />
        <Route path="/profil" element={<Private><Profil /></Private>} />
        <Route path="/company-setting/save" element={<Save />} />
      </Routes>
    </div>
  );
}

export default App;
