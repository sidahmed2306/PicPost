import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import miniLogo from "../../assets/img/miniLogo.svg";
import Feeds from "../../assets/img/Feeds.svg";
import addFollow from "../../assets/img/follow-person.svg";
import Navbar from "../../components/Navbar/Navbar";
import commentIcon from "../../assets/img/commentIcon.svg";
import like from "../../assets/img/likeHeart.svg";
import { apiBaseUrl } from "../../api";
import "./profileDetail.css";
const ProfileDetail = ({ token }) => {
  const [postImg, setPostImg] = useState();
  const [postCount, setPostCount] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [followingCount, setfollowingCount] = useState();
  const [profilId, setProfilId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [profileInfo, setProfileInfo] = useState();
  const [state, setState] = useState();
  const [followState, setFollowState] = useState(false);

  const { id } = useParams();
  const fetchPost = () => {
    fetch(`${apiBaseUrl}/users/profile-detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          setFollowState(result.state);
          setProfileInfo(result.user);
          setProfilId(result.user._id);
          setPostCount(result.postCount);
          setPostImg(result.post);
          setFollowersCount(result.followersCount);
          setfollowingCount(result.followingCount);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  useEffect(fetchPost, []);

  const follow = () => {
    fetch(`${apiBaseUrl}/users/add-follwer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: profilId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to follow");
        }

        return response.json();
      })
      .then((newLike) => {
        fetchPost();
      })
      .catch((err) => {
        console.error(`Error follow: ${err.message}`);
        throw err;
      });
  };
  console.log(profileInfo);
  console.log(followState);
  console.log(postImg);
  return (
    <div className="profile main">
      <div className="div-flex">
        <div className="home-username">
          <Link to="/home">
            <img src={miniLogo}></img>
          </Link>
          <h4 className="profile-username">
            {profileInfo ? profileInfo.userName : "Loading..."}
          </h4>
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
            <h3>{postCount}</h3>
            <p>Posts</p>
          </div>
          <div>
            <h3>{followersCount}</h3>
            <p>Follower</p>
          </div>
          <div>
            <h3>{followingCount}</h3>
            <p>Following</p>
          </div>
        </div>
        <div id="followBtn">
          {followState ? (
            <button
              className="following-profil-detail"
              id="following"
              onClick={follow}
            >
              following
            </button>
          ) : (
            <button
              className="follower-profil-detail"
              id="follow"
              onClick={follow}
            >
              <img src={addFollow} alt="" />
              follow
            </button>
          )}
        </div>
      </article>
      <div className="Feeds-container">
        <img src={Feeds}></img>
        <h3 className="Feeds">Feeds</h3>
      </div>
      <section className="grid-container">
        {postImg?.map((elt, index) => (
          <Link to={`/add-comment/${elt._id}`}>
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
};

export default ProfileDetail;
