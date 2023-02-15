import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UploadByGallery from "../../components/Upload/UploadByGallery";
import './Upload.css';

export default function Upload({ token }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");

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

    fetch("http://localhost:9003/api/v1/post/add-post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <UploadByGallery
        selectedFile={selectedFile}
        onFileChange={onFileChange}
        name={"postPicture"}
        className="uploadGallery"
      />
      <textarea value={caption} onChange={handleCaptionChange} className="caption" />
      <button onClick={upload} className="uploadButton">Upload</button>
      <Navbar page={"upload"} />
    </div>
  );
}
