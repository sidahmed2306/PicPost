import { apiBaseUrl } from "../../api";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/Logo.svg";

/* 
    firstName,
    lastName,
    userName,
    birthDate,
    email,
    password,
    tlfNumber,
    gender, 
    */

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  console.log(telNumber);
  function register(event) {
    event.preventDefault(); //page reload verhindern!
    fetch(`${apiBaseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        birthDate,
        email,
        password,
        telNumber,
        gender,
      }),
    })
      .then((res) => res.json())
      .then(({ status, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }
        return navigate("/verification");
      });
  }

  return (
    <div className="register">
      <h2>Create your Account</h2>
      <Logo />
      <form className="register-form">
        <formgroup>
          <input
            className="forget-passwort"
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label for="email">
            <br />
            firsname
          </label>
          <span>enter your firstname</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label for="email">
            <br />
            lastname
          </label>
          <span>enter your lastname</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label for="email">
            <br />
            username
          </label>
          <span>enter your username</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="date"
            placeholder="16.04.1994"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <label for="email">
            <br />
            date
          </label>
          <span>enter your date</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="email"
            placeholder="Email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="email">
            <br />
            email
          </label>
          <span>enter your email</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="email">
            <br />
            password
          </label>
          <span>enter your password</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="number"
            placeholder="YourDIGITS"
            value={telNumber}
            onChange={(e) => setTelNumber(e.target.value)}
          />
          <label for="email">
            <br />
            tel-number
          </label>
          <span>enter your tel-number</span>
        </formgroup>
        <formgroup>
          <select
            className="forget-passwort"
            onChange={(event) => setGender(event.target.value)}
            value={gender}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
        </formgroup>

        <button id="login-btn" onClick={register}>
          Sign up
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div>
        Already have an account?
        <Link to="/log-in">Sign in</Link>
      </div>
    </div>
  );
}
