import { Routes, Route } from "react-router-dom";
import Signup from "./views/signup"; // load view
import Profil from "./views/profil";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}

export default App;
