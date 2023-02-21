import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backArrow from "../../assets/img/backArrow.svg";
import paperPlane from "../../assets/img/paperPlane.svg";
import UserItem from "../../components/Search/UserItem";
import TimeAgo from "../../components/TimeAgo";
import CommentItem from "../../components/comments/CommentItem";
import LikeAndComment from "../../components/Home/LikeAndComment";
import "./commentsection.css";
import { apiBaseUrl } from "../../api";

// http://localhost:9003/api/v1/users/profile
export default function CommentSection({ token }) {
  console.log(token);
  const [postInfo, setPostInfo] = useState();
  const [authorInfo, setAuthorInfo] = useState();
  const [newComment, setNewComment] = useState("");
  const [profile, setProfile] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

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
          setProfile(result);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, [token]);

  const showComment = () => {
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
          console.log("post info", result);
          setPostInfo(result);
          setAuthorInfo(result.author);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  useEffect(showComment, [token]);
  const addComment = () => {
    fetch(`${apiBaseUrl}/post/add-comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        text,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }

        setNewComment(response);
        return response.json();
      })
      .then((newComment) => {
        showComment();
        setNewComment(newComment);
      })
      .catch((err) => {
        console.error(`Error adding comment: ${err.message}`);
        throw err;
      });
  };

  console.log("newcomment", newComment);
  console.log("text", text);
  return (
    <section className="comments-section">
      <div className="back-arrow">
        <Link to="/home">
          <img src={backArrow} alt="back"></img>
        </Link>
        <h3>Comments</h3>
      </div>
      <UserItem
        profilePicture={postInfo?.post.author.profilePicture.url}
        userName={postInfo?.post?.author?.userName}
        job={postInfo?.post?.author.job}
        id={postInfo?.post.author._id}
      />

      <div className="post-img-container">
        <img className="post-img" src={postInfo?.post.img.url}></img>
      </div>
      <div className="likeundcomment-section">
        <TimeAgo timestamp={postInfo?.post.createdAt} />
        <LikeAndComment
          id="likeundcomment-component"
          likes={postInfo?.post.likes}
          comments={postInfo?.post.comments}
        />
      </div>
      <div className="caption-section">
        <p>{postInfo?.post.author.userName}:</p>
        <p> {postInfo?.post?.caption}</p>
      </div>
      <div className="commentSection-old">
        {postInfo?.post.comments.map((comment) => (
          <div className="commentText-profile-info">
            <div div className="comment-profileInfo">
              <img src={comment.author.profilePicture.url} alt="" />
              <div className="userName-job">
                <p>{comment.author.userName}</p>
                <p>{comment.author.job}</p>
              </div>
            </div>
            <div className="commentText-time">
              <p>{comment.text}</p>
              <TimeAgo timestamp={comment.createdAt} />
            </div>
          </div>
        ))}
      </div>

      <div className="writecomment-section">
        <img src={profile?.profilePicture?.url} alt="" />
        <input
          className="comment-input"
          type="text"
          placeholder=" write your Comments"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <img onClick={addComment} src={paperPlane}></img>
      </div>
    </section>
  );
}
