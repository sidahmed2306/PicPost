import React from "react";
import LikeAndComment from "./LikeAndComment";
import ProfilePost from "./ProfilePost";

export default function Post(props) {
  return (
    <div className="post-article">
      <ProfilePost
        userName={props.username}
        profilePicture={props.profilePicture}
        job={props.job}
      />
      <div className="post-img-container">
        <img className="post-img" src={props.postImage}></img>
      </div>
      <LikeAndComment
        addlike={props.addlike}
        id={props.id}
        likes={props.likes}
        comments={props.comments}
      />
    </div>
  );
}
