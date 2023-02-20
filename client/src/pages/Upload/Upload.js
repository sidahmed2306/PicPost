import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import UploadByGallery from "../../components/Upload/UploadByGallery";
import "./Upload.css";
import { apiBaseUrl } from "../../api";

export default function Upload({ token }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  function upload() {
    const formData = new FormData();
    formData.append("postPicture", selectedFile, selectedFile.name);
    formData.append("caption", caption);

    fetch(`${apiBaseUrl}/post/add-post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="uploud-section">
      <UploadByGallery
        selectedFile={selectedFile}
        onFileChange={onFileChange}
        name={"postPicture"}
        className="uploadGallery"
      />
      {/* <textarea
        value={caption}
        onChange={handleCaptionChange}
        className="caption"
        placeholder="caption your post..."
      /> */}

      <formgroup>
        <input
          className="caption"
          type="textarea"
          className="forget-passwort"
          placeholder="caption your post..."
          onChange={handleCaptionChange}
        />
        <label for="textarea">
          <br />
          caption
        </label>
        <span>enter your caption</span>
      </formgroup>
      <button onClick={upload} className="uploadButton">
        Post
      </button>
      <Navbar page={"upload"} />
    </div>
  );
}
