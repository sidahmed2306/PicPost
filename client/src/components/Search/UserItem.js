import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css";

export default function UserItem(props) {
  return (
    <Link to={`/profil-detail/${props.id}`} className="user-item">
      <img src={props.profilePicture}></img>
      <div className="users-info">
        <h4>{props.userName}</h4>
        <p>{props.job}</p>
      </div>

      {/* <button className={following ? "following" : "follow"}>{following ? "Following" : "Follow"}</button> */}
    </Link>
  );
}
