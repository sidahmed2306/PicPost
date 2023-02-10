import { apiBaseUrl } from "../../api";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";

console.log(apiBaseUrl);
export default function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // muss sein für refresh token! -- "save httpOnly cookie session"
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }
        // result: { acccessToken, refreshToken }
        setToken(result.accessToken);
        return navigate("/sign-up");
      });
  }

  return (
    <div className="login">
      <h2>Login to your Account</h2>
      <Logo />
      <form className="register-form">
        <input
          type="email"
          placeholder="Email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <Link>Forgot the password?</Link>
      <div>
        Don't have an account?
        <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
}
