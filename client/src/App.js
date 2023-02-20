import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import LogIn from "./pages/Log-In/LogIn";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useState, useEffect } from "react";
import Upload from "./pages/Upload/Upload";
import HomePage from "./pages/Home/HomePage";
import CommentSection from "./pages/comments/CommentSection";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfile from "./pages/Profile/EditProfile";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import Search from "./pages/Search/Search";
import ProfileDetail from "./pages/Profile/ProfileDetail";
import Protected from "./components/Protected";
import VerficationCode from "./pages/verficationCode/verficationCode";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!token) {
      return;
    }

    const tokenPayloadBase64Str = token.split(".")[1];
    const tokenPayloadJsonStr = atob(tokenPayloadBase64Str);
    const tokenPayload = JSON.parse(tokenPayloadJsonStr);
    const exp = tokenPayload.exp;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    const tenSecondsBefore = 10;
    const triggerSilentTokenRefreshInSeconds =
      exp - nowInSeconds - tenSecondsBefore;

    console.log({ triggerSilentTokenRefreshInSeconds });
    const refreshTokenTimeoutID = setTimeout(() => {
      console.log("about to do silet refresh");

      fetch(`http://localhost:9003/api/v1/users/refresh-token`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(({ result }) => {
          setToken(result?.accessToken);
        });
    }, triggerSilentTokenRefreshInSeconds * 1000);

    return () => clearTimeout(refreshTokenTimeoutID);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn setToken={setToken} />} />
          <Route path="/login" element={<LogIn setToken={setToken} />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:resetPwdToken"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/home"
            element={
              <Protected token={token} setToken={setToken}>
                <HomePage token={token} />
              </Protected>
            }
          />
          <Route
            path="/add-comment/:id"
            element={<CommentSection token={token} />}
          />
          <Route
            path="/upload"
            element={
              <Protected token={token} setToken={setToken}>
                <Upload token={token} />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected token={token} setToken={setToken}>
                <ProfilePage setToken={setToken} token={token} />
              </Protected>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <Protected token={token} setToken={setToken}>
                <EditProfile token={token} />
              </Protected>
            }
          />
          <Route
            path="/search"
            element={
              <Protected token={token} setToken={setToken}>
                <Search token={token} />
              </Protected>
            }
          />

          <Route
            path="/profil-detail/:id"
            element={
              <Protected token={token} setToken={setToken}>
                <ProfileDetail token={token} />
              </Protected>
            }
          />
          <Route
            path="/verification"
            element={<VerficationCode token={token} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
