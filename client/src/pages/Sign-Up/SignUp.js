import { apiBaseUrl } from "../../api";
import React from 'react';
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
    const [tlfNumber, setTlfNumber] = useState("");
    const [gender, setGender] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

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
                tlfNumber,
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
                return navigate("/home");
            });
    }

    return (
        <div className="register">
            <h2>Create your Account</h2>
            <Logo />
            <form className='register-form'>
                <input
                    type="text"
                    placeholder="Firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="16.04.1994"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
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
                <input
                    type="number"
                    placeholder="YourDIGITS"
                    value={tlfNumber}
                    onChange={(e) => setTlfNumber(e.target.value)}
                />
                <select
                    onChange={(event) => setGender(event.target.value)}
                    value={gender}>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <button onClick={register}>Sign up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <div>
                Already have an account?
                <Link to="/log-in">Sign in</Link>
            </div>
        </div>
    );
};

