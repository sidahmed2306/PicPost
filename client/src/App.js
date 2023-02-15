import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import LogIn from "./pages/Log-In/LogIn";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useState } from "react";
import Upload from "./pages/Upload/Upload";
import HomePage from "./pages/Home/HomePage";
import CommentSection from "./pages/comments/CommentSection";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfile from "./pages/Profile/EditProfile";
import Search from "./pages/Search/Search";
import ProfileDitail from "./pages/Profile/ProfileDetail";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn setToken={setToken} />} />
          <Route path="/login" element={<LogIn setToken={setToken} />} />
          <Route path="/home" element={<HomePage token={token} />} />
          <Route path="/detail/:postId" element={<CommentSection />} />
          <Route path="/upload" element={<Upload token={token} />} />
          <Route path="/profile" element={<ProfilePage token={token} />} />
          <Route path="/edit-profile" element={<EditProfile token={token} />} />
          <Route path="/search" element={<Search token={token} />} />
          <Route
            path="/profil-detail/:id"
            element={<ProfileDitail token={token} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
