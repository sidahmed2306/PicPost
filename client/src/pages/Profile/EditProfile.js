import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeFormData } from "../../utils/formData";
import { apiBaseUrl } from "../../api";
import editProfilee from "../../assets/img/editProfile.svg";
import backarrow from "../../assets/img/backArrow.svg";
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

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const onImageChange = (event) => {
    setProfilePicture(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  useEffect(() => {
    fetch(`${apiBaseUrl}/users/profile`, {
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
          setProfilePicture(result.profilePicture.url);
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

    fetch(`${apiBaseUrl}/users/profile`, {
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
    navigate("/profile");
  };
  return (
    <section className="editprofile-section">
      <div style={{ display: "flex", padding: "20px" }}>
        <Link to="/profile">
          <img src={backarrow} alt="backarrow" />
        </Link>
        <h2>Edit Profile</h2>
      </div>
      <form className="register-form foregt-form">
        <div className="profile-picture-w-edit-profile-editpage">
          <input
            onChange={onImageChange}
            type="file"
            style={{ display: "none" }}
            id="files"
          />

          <label id="labelEditProfile" htmlFor="files">
            <img
              src={profilePicturePreview || profilePicture}
              alt="profil-picture"
              className="profile-picture"
              style={{ width: "120px" }}
            ></img>
            <img id="edit-profile" src={editProfilee}></img>
          </label>
        </div>
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
            placeholder="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          ></input>
          <label for="email">
            <br />
            job
          </label>
          <span>enter your job</span>
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
            type="text"
            placeholder="link"
            value={link}
            onChange={(e) => setlink(e.target.value)}
          />
          <label for="email">
            <br />
            link
          </label>
          <span>enter your link</span>
        </formgroup>
        <formgroup>
          <input
            className="forget-passwort"
            type="tel"
            placeholder="Telefon"
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

        <button id="login-btn" onClick={editProfile}>
          Update
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}
