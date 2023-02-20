import React from "react";
import { Link } from "react-router-dom";
import LikeAndComment from "./LikeAndComment";
import ProfilePost from "./ProfilePost";

export default function Post(props) {
  return (
    <div className="post-article">
      <Link to={`/profil-detail/${props.profileId}`}>
        <ProfilePost
          userName={props.username}
          profilePicture={props.profilePicture}
          job={props.job}
        />
      </Link>
      <div className="post-img-container">
        <img className="post-img" src={props.postImage}></img>
      </div>
      <LikeAndComment
        isLikedByMe={props.isLikedByMe}
        addlike={props.addlike}
        id={props.id}
        likes={props.likes}
        comments={props.comments}
      />
    </div>
  );
}
