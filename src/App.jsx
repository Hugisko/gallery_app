import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import Photopage from "./pages/photopage/Photopage";

const App = () => {
  return (
    <div className="app">
      <div className="wrapper">
        <h1>Fotogaléria</h1>
        <main>
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/photos/:id" element={<Photopage/>} />
            </Routes>
        </main>
      </div> 
    </div>
  );
}

export default App;
