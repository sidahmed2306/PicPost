import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Home/Post";
import Navbar from "../../components/Navbar/Navbar";
import showMore from "../../assets/img/showMore.svg";
import commentIcon from "../../assets/img/commentIcon.svg";
import like from "../../assets/img/likeHeart.svg";
import "./home.css";
import ProfilePost from "../../components/Home/ProfilePost";
import LikeAndComment from "../../components/Home/LikeAndComment";

export default function HomePage({ token }) {
  const [id, setId] = useState("");
  const [result, setResult] = useState([]);
  const [newLike, setNewLike] = useState([]);

  const [users, setUsers] = useState([]);

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
  console.log(newLike);
  console.log("result", result);
  return (
    <>
      <section>
        {result.map((elt) => (
          <Post
            addlike={() => {
              addLike(elt._id);
            }}
            profilePicture={elt.author.profilePicture.url}
            username={elt.author.userName}
            job={elt.author.job}
            postImage={elt.img?.url}
            likes={elt.likes}
            id={elt._id}
            comments={elt.comments}
          />
        ))}
      </section>
      <Navbar page={"home"} />
    </>
  );
}
