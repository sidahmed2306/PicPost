import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Home/Post";
import Navbar from "../../components/Navbar/Navbar";
import showMore from "../../assets/img/showMore.svg";
import commentIcon from "../../assets/img/commentIcon.svg";
import like from "../../assets/img/likeHeart.svg";
import "./home.css";
import ProfilePost from "../../components/Home/ProfilePost";
import LikeAndComment from "../../components/Home/LikeAndComment";

export default function HomePage({ token }) {
  const [result, setResult] = useState([]);

  const [users, setUsers] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
  }, [token]);
  console.log(result);
  console.log(
    "result",
    result.map((elt) => elt.author.profilePicture.url)
  );
  return (
    <>
      <section>
        {result.map((elt) => (
          <Post
            profilePicture={elt.author.profilePicture.url}
            username={elt.author.userName}
            job={elt.author.job}
            postImage={elt.img?.url}
            likes={elt.likes}
            comments={elt.comments}
          />
        ))}
      </section>
      <Navbar page={"home"} />
    </>
  );
}
