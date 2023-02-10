import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Sign-Up/SignUp";
import LogIn from "./pages/Log-In/LogIn";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
