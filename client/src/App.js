import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import LogIn from "./pages/Log-In/LogIn";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useState } from "react";
import Upload from "./pages/Upload/Upload";
import HomePage from "./pages/Home/HomePage";
import CommentSection from './pages/comments/CommentSection';


function App() {
  const [token, setToken] = useState("");


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn setToken={setToken} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:postId" element={<CommentSection />} />
          <Route path="/upload" element={<Upload />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
