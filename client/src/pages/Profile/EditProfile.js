import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeFormData } from "../../utils/formData";
export default function EditProfile({ token }) {
  const [firstName, setFirstName] = useState("");
  const [result, setResult] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [job, setJob] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [link, setlink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const [profilePicturePreview, setProfilePicturePreview] = useState("");

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
          setStatus(status);
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setUserName(result.userName);
          setBirthDate(result.birthDate);
          setJob(result.job);
          setEmail(result.email);
          setlink(result.link);
          setProfilePicturePreview(result.profilePicture.url);
          setTelNumber(result.telNumber);
          setResult(result);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, [token, status]);
  console.log("result", result);
  function editProfile(event) {
    event.preventDefault();

    const formData = makeFormData({
      userName,
      firstName,
      lastName,
      email,
      job,
      telNumber,
      profilePicture,
      link,
      gender,
    });

    fetch(`http://localhost:9003/api/v1/users/profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          console.log(result);
          navigate("/profile");
        } else {
          console.log(error);
          setErrorMessage("Error editing profile, try again later");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error editing profile, try again later");
      });
  }
  const cancelEdit = (event) => {
    event.preventDefault();
  };
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
        <input
          type="text"
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
          id="profile_picture"
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="link"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <input
          type="tel"
          placeholder="Telefon"
          value={telNumber}
          onChange={(e) => setTelNumber(e.target.value)}
        />
        <select
          onChange={(event) => setGender(event.target.value)}
          value={gender}
        >
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>

        <button onClick={editProfile}>Update</button>
        <button onClick={cancelEdit}>Cancel</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}
