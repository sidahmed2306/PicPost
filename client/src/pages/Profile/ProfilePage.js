import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import miniLogo from "../../assets/img/miniLogo.svg";
import addNewPost from "../../assets/img/addNewPost.svg";
import pen from "../../assets/img/pen.svg";
import showMore from "../../assets/img/showMore.svg";
import { Link } from "react-router-dom";
import editProfile from "../../assets/img/editProfile.svg";

export default function ProfilePage({ token }) {
    const [postImg, setPostImg] = useState();

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
                    setPostImg(result.postImage);
                } else {
                    setErrorMessage(error.message);
                }
            });
    }, [token]);
    console.log(profileInfo);

    console.log(postImg);

    return (
        <div className="profile">
            <div className="div-flex">
                <img src={miniLogo}></img>
                <h2 className="profile-username">{profileInfo ? profileInfo.userName : "Loading..."}</h2>
                <div>
                    <Link to="/upload">
                        <img src={addNewPost}></img>
                    </Link>
                    <Link to="/edit-profile">
                        <img src={pen}></img>
                    </Link>
                    <img src={showMore}></img>
                </div>
            </div>
            <article>
                <div className="profile-picture-w-edit-profile">
                    <img
                        src={profileInfo ? profileInfo.profilePicture : "Loading..."}
                        alt="profil-picture"
                        className="profile-picture"
                        style={{ width: "100px" }}
                    ></img>
                    <Link to="/edit-profile">
                        <img className="edit-profile" src={editProfile}></img>
                    </Link>
                </div>
                <h3>
                    {profileInfo
                        ? `${profileInfo.firstName} ${profileInfo.lastName}`
                        : "Loading..."}
                </h3>
                <p>{profileInfo ? profileInfo.job : "Loading..."}</p>
                <a>{profileInfo ? profileInfo.bio : "Loading..."}</a>
                <Link>
                    <p>{profileInfo ? profileInfo.link : "Loading..."}</p>
                </Link>
                <div className="div-flex">
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
            <section className="grid-container">
                {postImg?.map((elt) => (
                    <img className="grid-item"
                        style={{ width: "100px" }}
                        src={`http://localhost:9003/${elt}`}
                        alt=""
                    />
                ))}
            </section>
            <Navbar page={"profile"} />
        </div>
    );
}
