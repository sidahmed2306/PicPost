import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import miniLogo from "../../assets/img/miniLogo.svg";
import addNewPost from "../../assets/img/addNewPost.svg";
import pen from "../../assets/img/pen.svg";
import showMore from "../../assets/img/showMore.svg";
import { Link } from "react-router-dom";

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
                <h2>{profileInfo ? profileInfo.userName : "Loading..."}</h2>
                <div>
                    <Link to="/upload">
                        <img src={addNewPost}></img>
                    </Link>
                    <img src={pen}></img>
                    <img src={showMore}></img>
                </div>
            </div>
            <article>
                <img
                    src={profileInfo ? profileInfo.profilePicture : "Loading..."}
                    alt="profil-picture"
                    className="profilepicture"
                    style={{ width: "100px" }}
                ></img>
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
                    <div>{profileInfo ? profileInfo.postCount : "Loading..."}</div>
                    <div>{profileInfo ? profileInfo.followersCount : "Loading..."}</div>
                    <div>{profileInfo ? profileInfo.followingCount : "Loading..."}</div>
                </div>
            </article>
            <section>
                {postImg?.map((elt) => (
                    <div
                        className="grid"
                        style={{ display: "flex", flexDirection: "column", gap: "50px" }}
                    >
                        <img
                            style={{ width: "200px" }}
                            src={`http://localhost:9003/${elt}`}
                            alt=""
                        />
                    </div>
                ))}
            </section>
            <Navbar page={"profile"} />
        </div>
    );
}
