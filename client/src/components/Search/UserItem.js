import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css";

export default function UserItem(props) {
  // props.getAllUser();
  console.log(props.isFollow);
  return (
    <div className="user-item">
      <Link to={`/profil-detail/${props.id}`}>
        <div id="profile-infos">
          <img src={props.profilePicture}></img>
          <div className="users-info">
            <h4>{props.userName}</h4>
            <p>{props.job}</p>
          </div>
        </div>
      </Link>

      {props.isFollow ? (
        <button id="following-search" onClick={() => props.follow(props.id)}>
          following
        </button>
      ) : (
        <button id="follow-search" onClick={() => props.follow(props.id)}>
          follow
        </button>
      )}
    </div>
  );
}
