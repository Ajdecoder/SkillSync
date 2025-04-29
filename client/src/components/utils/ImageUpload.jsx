import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload && onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      <div>
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button
              className="remove-button"
              onClick={() => {
                setPreview(null);
                onImageUpload && onImageUpload(null);
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <p>Drag and drop an image here, or</p>
            <label className="upload-button">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
