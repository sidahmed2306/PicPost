// import { ReactComponent as Lupe } from "../../assets/img/lupe.svg";
import { ReactComponent as ProfileIcon } from "../../assets/img/profileIcon.svg";
import lupe from "../../assets/img/lupe.svg";
import React from "react";
import "./Searchbar.css";

export default function Searchbar({ handleChange, searchTerm }) {
  return (
    // <div className="search-wrapper">
    //   <div className="searchbar-wrapper">
    //     <Lupe className="lupe"/>
    //     <input
    //       name={searchTerm}
    //       type="text"
    //       value={searchTerm}
    //       onChange={handleChange}
    //       placeholder="search profile"
    //     />
    //   </div>
    //   <ProfileIcon />
    //   <div className="divide"></div>
    // </div>

    <div className="search-wrapper">
      <div class="container">
        <div class="search-box">
          <input
            type="text"
            class="search-box-input"
            name={searchTerm}
            value={searchTerm}
            onChange={handleChange}
            placeholder="search profile"
          />
          <button class="search-box-btn">
            <img className="lupe" src={lupe} alt="" />
          </button>
        </div>
      </div>
      <div className="profilePicture">
        <ProfileIcon />
        <div className="divide"></div>
      </div>
    </div>
  );
}
