import { ReactComponent as X } from "../../assets/img/x.svg";
import React from "react";
import { ReactComponent as UploadCam } from "../../assets/img/UploadCam.svg";
import "./UploadByGallery.css";
import { Link } from "react-router-dom";

export default function UploadByGallery({ onFileChange, selectedFile }) {
  const divPic = document.getElementById("new");
  const uploadLabel = document.getElementById("label");

  if (selectedFile) {
    uploadLabel.style.display = "none";
    divPic.style.padding = "0px";
  }
  return (
    <div className="UploadByGallery-wrapper">
      <div className="plus-wrapper shadow">
        <Link to="/profile">
          <X />
        </Link>
        <p>New Post</p>
        <div className="empty"></div>
      </div>
      <div className="uploadDiv" id="new">
        <input type="file" onChange={onFileChange} id="files" />
        <label htmlFor="files" id="label">
          <UploadCam className="cam" />
          Upload
        </label>
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="selected"
          />
        )}
      </div>
    </div>
  );
}
