import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const ProfileDitail = ({ token }) => {
  const [postImg, setPostImg] = useState();
  const [postCount, setPostCount] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [followingCount, setfollowingCount] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [profileInfo, setProfileInfo] = useState();

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:9003/api/v1/users/profile-detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          setProfileInfo(result.user);
          setPostCount(result.postCount);
          setPostImg(result.post);
          setFollowersCount(result.followersCount);
          setfollowingCount(result.followingCount);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, []);
  console.log(profileInfo);
  console.log(postImg);
  return (
    <>
      <article className="profile-bio">
        <h4>{profileInfo ? profileInfo.userName : "Loading..."}</h4>
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
        <a className="bio">{profileInfo ? profileInfo.bio : "Loading..."}</a>
        <Link className="link">
          {profileInfo ? profileInfo.link : "Loading..."}
        </Link>

        <div className="div-flex counts">
          <div>
            <h3>{postCount}</h3>
            <p>Posts</p>
          </div>
          <div className="border">
            <h3>{followersCount}</h3>
            <p>Follower</p>
          </div>
          <div>
            <h3>{followingCount}</h3>
            <p>Following</p>
          </div>
        </div>
      </article>

      <section className="grid-container">
        {postImg?.map((elt, index) => (
          <img
            key={index}
            className="grid-item"
            src={`${elt.img.url}`}
            alt=""
          />
        ))}
      </section>

      <Navbar page={"profile"} />
    </>
  );
};

export default ProfileDitail;
