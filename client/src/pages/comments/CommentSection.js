import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backArrow from "../../assets/img/backArrow.svg";
import paperPlane from "../../assets/img/paperPlane.svg";
import UserItem from "../../components/Search/UserItem";
import TimeAgo from "../../components/TimeAgo";
import CommentItem from "../../components/comments/CommentItem";

// http://localhost:9003/api/v1/users/profile
export default function CommentSection({ token }) {
  console.log(token);
  const [postInfo, setPostInfo] = useState();
  const [authorInfo, setAuthorInfo] = useState();
  const [newComment, setNewComment] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9003/api/v1/post/add-comment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "ok") {
          setPostInfo(result);
          setAuthorInfo(result.author);
        } else {
          setErrorMessage(error.message);
        }
      });
  }, [token]);
  const addComment = () => {
    fetch(`http://localhost:9003/api/v1/post/add-comment/${id}`, {
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
        console.log("newcomment hallo");
        return setNewComment(newComment);
      })
      .catch((err) => {
        console.error(`Error adding comment: ${err.message}`);
        throw err;
      });
  };
  //   useEffect(addComment, [token]);
  console.log(postInfo?.post);
  console.log("newcomment", newComment);
  console.log("text", text);
  return (
    <section>
      <div>
        <Link to="/home">
          <img src={backArrow} alt="back"></img>
        </Link>
        <h3>Comments</h3>
        <img onClick={addComment} src={paperPlane}></img>

        <input
          type="text"
          placeholder=" write your Comments"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <UserItem profilePicture={postInfo?.post.author.profilePicture.url} userName={postInfo?.post?.author?.userName} job={postInfo?.post?.author.job} />
      <div>
        <p>{postInfo?.post?.caption}</p>
        <TimeAgo timestamp={postInfo?.post.createdAt} />
      </div>
      <div className="post-img-container">
        <img className="post-img" src={postInfo?.post.img.url}></img>
      </div>
      {postInfo?.post.comments.map(comment => <CommentItem userName={comment.author.userName} job={comment.author.job} profilePicture={comment.author.profilePicture.url} comment={comment.text} />)}


    </section>
  );
}
