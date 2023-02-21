import React, { useState, useRef, useEffect } from "react";
import { apiBaseUrl } from "../../api";
import { Link, useParams } from "react-router-dom";
const UpdatePost = ({ token }) => {
  const [caption, setCaption] = useState("");
  const [postInfo, setPostInfo] = useState([]);
  const [postId, setPostId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
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
          setPostId(result._id);
          setPostInfo(result);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  useEffect(showPost, [token]);
  console.log(postInfo);
  const update = ({ caption, postId }) => {
    console.log(caption, caption);
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
        // setSuccessMessage("Success! Please login now...");
      });
  };
  return (
    <>
      <section className="comments-section">
        <div className="post-img-container">
          <img className="post-img" src={postInfo?.post?.img.url}></img>
        </div>
        <div className="caption-section">
          <p> caption: {postInfo?.post?.caption}</p>
        </div>
        <input
          // id="comment-input"
          className="comment-input "
          type="text"
          placeholder=" write your caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={update}>update</button>
      </section>
    </>
  );
};

export default UpdatePost;
