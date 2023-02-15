import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function EditProfile({ token }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [job, setJob] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tlfNumber, setTlfNumber] = useState("");
    const [gender, setGender] = useState("");
    const [webiste, setWebsite] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [profileInfo, setProfileInfo] = useState();

    useEffect(() => {
        fetch(`http://localhost:9003/api/v1/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(({ status, result, error }) => {
                if (status === "ok") {
                    setProfileInfo(result);
                    setFirstName(profileInfo ? profileInfo.userName : "Loading...");
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, [token]);


    function editProfile() {

    }
    return (
        <section>
            <div>
                <Link to="/profile">.</Link>
                <h2>Edit Profile</h2>
            </div>
            <form className="register-form">
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
                <input type="text"
                    placeholder="job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                ></input>
                <input
                    type="date"
                    placeholder="16.04.1994"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    type="tel"
                    placeholder="Telefon"
                    value={tlfNumber}
                    onChange={(e) => setTlfNumber(e.target.value)}
                />
                <select
                    onChange={(event) => setGender(event.target.value)}
                    value={gender}
                >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                </select>

                <button onClick={editProfile}>Update</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>

        </section>
    );
}
