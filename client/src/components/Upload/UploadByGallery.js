
import React from 'react';

export default function UploadByGallery({ onFileChange, selectedFile }) {
    return (
        <div>
            <label for="file" >Bild Hochladen</label>
            <input id="file" type="file" onChange={onFileChange} placeholder="Bild Hochladen" />
            {selectedFile && (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            )}
        </div>
    );
}
