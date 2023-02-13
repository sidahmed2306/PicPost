import React, { useEffect, useState } from 'react';
import UploadByGallery from '../../components/Upload/UploadByGallery';

export default function Upload({ token }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState("");


    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCaptionChange = event => {
        setCaption(event.target.value);
    };

    function upload() {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("caption", caption);

        fetch("http://localhost:9003/api/v1/post/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <UploadByGallery selectedFile={selectedFile} onFileChange={onFileChange} />
            <textarea value={caption} onChange={handleCaptionChange} />
            <button onClick={upload}>Upload</button>
        </div>
    );
}
