import React from "react";
import likeHeart from "../../assets/img/likeHeart.svg";
import likeHeartRed from "../../assets/img/redlike.svg";
import commentIcon from "../../assets/img/commentIcon.svg";
import { Link } from "react-router-dom";

export default function LikeAndComment(props) {
  return (
    <div className="likes-comments">
      <div className="likes">
        {props.isLikedByMe ? (
          <img onClick={props.addlike} src={likeHeartRed}></img>
        ) : (
          <img onClick={props.addlike} src={likeHeart}></img>
        )}

        <h5 className="likes-p">{props.likes?.length}</h5>
      </div>
      <Link to={`/add-comment/${props.id}`} className="comments">
        <img src={commentIcon}></img>
        <h5 className="comments-p">{props.comments?.length}</h5>
        <h5 className="comments-p">{props.comments?.length}</h5>
      </Link>
    </div>
  );
}
