import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Home/Post";
import Navbar from "../../components/Navbar/Navbar";
import showMore from "../../assets/img/showMore.svg";
import "./home.css";
import miniLogo from "../../assets/img/miniLogo.svg";
import addNewPost from "../../assets/img/addNewPost.svg";

export default function HomePage({ token }) {
  const [id, setId] = useState("");
  const [result, setResult] = useState([]);
  const [newLike, setNewLike] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [myUserId, setMyUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPost = () => {
    fetch(`http://localhost:9003/api/v1/users/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          setResult(result.posts);
          setMyUserId(result.myUserId);

          setLikeState(result.posts.state);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  useEffect(fetchPost, [token]);

  const addLike = (postId) => {
    console.log("postId", postId);
    setId(postId);
    fetch(`http://localhost:9003/api/v1/post/add-like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: postId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add like");
        }
        setNewLike(response);
        return response.json();
      })
      .then((newLike) => {
        fetchPost();
      })
      .catch((err) => {
        console.error(`Error adding like: ${err.message}`);
        throw err;
      });
  };
  console.log("newlike", myUserId);
  console.log("result", result);
  return (
    <div className="homepage">
      <section className="home-page">
        <div className="div-flex2">
          <div className="logo-name">
            <Link to="/home">
              <img src={miniLogo}></img>
            </Link>
            <h2 className="profile-username">PicPost</h2>
          </div>

          <div className="icons2">
            <Link to="/upload">
              <img src={addNewPost}></img>
            </Link>
            <Link>
              <img src={showMore}></img>
            </Link>
          </div>
        </div>
        {result.map((elt, i) => (
          <Post
            key={i}
            addlike={() => {
              addLike(elt._id);
            }}
            isLikedByMe={elt.likes.map((elt) => elt._id).includes(myUserId)}
            profilePicture={elt.author?.profilePicture.url}
            username={elt.author?.userName}
            job={elt.author?.job}
            postImage={elt.img?.url}
            likes={elt.likes}
            id={elt._id}
            profileId={elt.author._id}
            comments={elt.comments}
          />
        ))}
      </section>
      <Navbar page={"home"} />
    </div>
  );
}
