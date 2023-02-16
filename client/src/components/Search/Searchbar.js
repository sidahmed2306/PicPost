import { ReactComponent as Lupe } from "../../assets/img/lupe.svg";
import { ReactComponent as ProfileIcon } from "../../assets/img/profileIcon.svg";
import React from "react";
import './Searchbar.css';

export default function Searchbar({ handleChange, searchTerm }) {
  return (
    <div className="search-wrapper">
      <div className="searchbar-wrapper">
        <Lupe className="lupe"/>
        <input
          name={searchTerm}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="search profile"
        />
      </div>
      <ProfileIcon />
      <div className="divide"></div>
    </div>
  );
}
