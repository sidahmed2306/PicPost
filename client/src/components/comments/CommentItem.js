import React from "react";
import ProfilePost from "../Home/ProfilePost";
import "./commentItem.css";

export default function CommentItem(props) {
  return (
    <div className="commentItem-section">
      <ProfilePost
        userName={props.userName}
        profilePicture={props.profilePicture}
        job={props.job}
      />
      <p className="comment-p">{props.comment}</p>
    </div>
  );
}
