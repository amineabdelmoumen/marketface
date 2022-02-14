import { Routes, Route } from "react-router-dom";
import Signup from "./views/signup"; // load view
import Identite from "./components/form-company/Indentite";
import Profil from "./views/profil";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      {/* <Indentite /> */}
    </div>
  );
}

export default App;
