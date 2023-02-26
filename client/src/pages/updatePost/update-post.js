import React, { useState, useRef, useEffect } from "react";
import backarrow from "../../assets/img/backArrow.svg";
import { apiBaseUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import "./updatepost.css";
import { Link, useParams } from "react-router-dom";
const UpdatePost = ({ token }) => {
  const [caption, setCaption] = useState("");
  const [postInfo, setPostInfo] = useState([]);
  const [postId, setPostId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const showPost = () => {
    fetch(`${apiBaseUrl}/post/add-comment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          console.log("post info", result.post._id);
          setPostId(result.post._id);
          setPostInfo(result);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  useEffect(showPost, [token]);
  console.log(postId);

  const update = (caption, postId) => {
    console.log("postcaption", caption, postId);
    fetch(`${apiBaseUrl}/post/edit-post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: caption,
        id: postId,
      }),
    })
      .then((res) => res.json())
      .then(({ status, error, result }) => {
        console.log("reset-password", { status, result, error });
        if (status === "error") {
          // error handling...
          setErrorMessage("Please use only the link from your email");

          return;
        }

        setErrorMessage("");
        showPost();
      });
  };
  const deletePost = (postId) => {
    console.log("postcaption", postId);
    fetch(`${apiBaseUrl}/post/delete-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: postId,
      }),
    })
      .then((res) => res.json())
      .then(({ status, error, result }) => {
        console.log("reset-password", { status, result, error });
        if (status === "error") {
          // error handling...
          setErrorMessage("Please use only the link from your email");

          return;
        }

        setErrorMessage("");
        navigate("/profile");
      });
  };
  return (
    <section className="comments-section updatepost">
      <div style={{ display: "flex", padding: "20px" }}>
        <Link to="/profile">
          <img src={backarrow} alt="backarrow" />
        </Link>
        <h2> Profile</h2>
      </div>
      <button
        id="login-btn"
        onClick={() => {
          deletePost(postId);
        }}
      >
        delete this Post
      </button>
      <div className="post-img-container updateimg">
        <img className="post-img" src={postInfo?.post?.img.url}></img>
      </div>
      <div className="caption-section">
        <p className="caption-caption">caption :</p>
        <p className="updatecaption"> {postInfo?.post?.caption}</p>
      </div>
      <formgroup id="formgroup-update">
        <input
          className="forget-passwort"
          type="text"
          placeholder="enter your new caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label id="label-update" for="email">
          <br />
          caption
        </label>
        <span>enter your new caption</span>
      </formgroup>
      <button
        id="login-btn"
        onClick={() => {
          update(caption, postId);
        }}
      >
        update
      </button>
    </section>
  );
};

export default UpdatePost;
