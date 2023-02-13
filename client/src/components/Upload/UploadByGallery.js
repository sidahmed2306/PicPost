
import React from 'react';

export default function UploadByGallery({ onFileChange, selectedFile }) {
    return (
        <div>
            <input type="file" onChange={onFileChange} />
            {selectedFile && (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            )}
        </div>
    );
}
