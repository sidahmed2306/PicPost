import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import miniLogo from "../../assets/img/miniLogo.svg";
import addNewPost from "../../assets/img/addNewPost.svg";
import pen from "../../assets/img/pen.svg";
import showMore from "../../assets/img/showMore.svg";
import { Link, useNavigate } from "react-router-dom";
import editProfile from "../../assets/img/editProfile.svg";
import Feeds from "../../assets/img/Feeds.svg";
import { apiBaseUrl } from "../../api";
import logoutimg from "../../assets/img/log-out.svg";
import "./ProfilePage.css";

export default function ProfilePage({ token, setToken }) {
  const [postImg, setPostImg] = useState();
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [profileInfo, setProfileInfo] = useState();
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
          setResult(result.post);
          setProfileInfo(result);
          setPostImg(result.postImage);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, [token]);

  function logout(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setToken(null);
        navigate("/log-in"); // LogoutPage will delete Token and navigate to /login
      });
  }
  console.log(result);

  return (
    <div className="profile main">
      <div className="div-flex">
        <div className="home-username">
          <Link to="/home">
            <img src={miniLogo}></img>
          </Link>
          <h2 className="profile-username">
            {profileInfo ? profileInfo.userName : "Loading..."}
          </h2>
        </div>

        <div className="icons">
          <Link to="/upload">
            <img src={addNewPost}></img>
          </Link>
          <Link to="/edit-profile">
            <img src={pen}></img>
          </Link>
          <Link>
            <img src={showMore}></img>
          </Link>
          <Link>
            <img onClick={logout} src={logoutimg}></img>
          </Link>
        </div>
      </div>
      <article className="profile-bio">
        <div className="profile-picture-w-edit-profile">
          <img
            src={profileInfo ? profileInfo.profilePicture.url : "Loading..."}
            alt="profil-picture"
            className="profile-picture"
            style={{ width: "120px" }}
          ></img>
          {/* <Link to="/edit-profile">
            <img className="edit-profile" src={editProfile}></img>
          </Link> */}
        </div>
        <h3>
          {profileInfo
            ? `${profileInfo.firstName} ${profileInfo.lastName}`
            : "Loading..."}
        </h3>
        <p>{profileInfo ? profileInfo.job : "Loading..."}</p>
        <Link id="link">{profileInfo ? profileInfo.link : "Loading..."}</Link>

        <div className="div-flex counts">
          <div>
            <h3>{profileInfo ? profileInfo.postCount : "Loading..."}</h3>
            <p>Posts</p>
          </div>
          <div>
            <h3>{profileInfo ? profileInfo.followersCount : "Loading..."}</h3>
            <p>Follower</p>
          </div>
          <div>
            <h3>{profileInfo ? profileInfo.followingCount : "Loading..."}</h3>
            <p>Following</p>
          </div>
        </div>
      </article>
      <div className="Feeds-container">
        <img src={Feeds}></img>
        <h3 className="Feeds">Feeds</h3>
      </div>
      <section className="grid-container">
        {result?.map((elt, index) => (
          <Link to={`/updatpost/${elt._id}`}>
            <div className="grid-item-container">
              <img
                key={index}
                className="grid-item"
                src={`${elt.img.url}`}
                alt=""
              />
            </div>
          </Link>
        ))}
      </section>
      <Navbar page={"profile"} />
    </div>
  );
}
