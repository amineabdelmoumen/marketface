import { Routes, Route } from "react-router-dom";
import Signup from "./views/signup"; // load view
import Profil from "./views/profil";
import Save from "./views/profil/save";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/save" element={<Save />} />
      </Routes>
    </div>
  );
}

export default App;
