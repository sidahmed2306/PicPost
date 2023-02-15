import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Home/Post";
import Navbar from "../../components/Navbar/Navbar";
import showMore from "../../assets/img/showMore.svg";
import commentIcon from "../../assets/img/commentIcon.svg";
import like from "../../assets/img/likeHeart.svg";
import "./home.css";

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
  return (
    <>
      <section>
        {result.map((elt) => (
          <article className="post-article">
            <div className="author-profil">
              <div className="author-info">
                <img src={`${elt.author.profilPicture}`} alt="" />
                <div className="author-p">
                  <p>{elt.author.userName}</p>
                  <p>{elt.author.job}</p>
                </div>
              </div>
              <img className="schowsvg" src={showMore} alt="" />
            </div>
            <div>
              <img className="post-img" src={`${elt.img?.url}`} alt="" />
            </div>
            <div className="likes-comments">
              <div className="comments">
                <p className="comments-p">{elt.comments.length}</p>
                <img src={commentIcon} alt="" />
              </div>
              <div className="likes">
                <p className="likes-p">{elt.likes.length}</p>
                <img src={like} alt="" />
              </div>
            </div>
          </article>
        ))}
      </section>
      <Navbar page={"home"} />
    </>
  );
}
