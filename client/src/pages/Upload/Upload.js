import React, { useState } from 'react';
import UploadByGallery from '../../components/Upload/UploadByGallery';

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>
            <UploadByGallery selectedFile={selectedFile} onFileChange={onFileChange} />
        </div>
    );
}
