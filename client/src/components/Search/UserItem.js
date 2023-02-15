import React from "react";

export default function UserItem(props) {
  return (
    <div className="user-item">
      <img src={props.profilePicture}></img>
      <div>
        <h4>{props.userName}</h4>
        <p>{props.job}</p>
      </div>
      {/* <button className={following ? "following" : "follow"}>{following ? "Following" : "Follow"}</button> */}
    </div>
  );
}
