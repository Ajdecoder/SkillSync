import React, { useState, useRef, useEffect } from "react";
import { Pencil, X, Loader2 } from "lucide-react";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";

const ProfileHeader = ({ user, profileCompletion, userRole }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [viewEdit, setViewEdit] = useState(false);

  const fileInputRef = useRef(null);
  const viewEditRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (!file) return;

    // File validation
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    console.log(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setIsPreviewOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setUploadError("No file selected");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await axios.post(
        `${PORT_CLIENT}/api/user/profile/upload-avatar/${user?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data.profilePicture) {
        setPreviewImage(response.data.profilePicture);
        setIsPreviewOpen(false);
      }
    } catch (error) {
      setUploadError(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewEditRef.current && !viewEditRef.current.contains(event.target)) {
        setViewEdit(false);
      }
    };

    if (viewEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewEdit]);

  const imageSrc =
    user?.profilePicture ||
    user?.profile ||
    "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg";
    setPreviewImage(imageSrc);

  return (
    <>
      <div className="profile-header flex flex-col sm:flex-row sm:items-center sm:justify-start items-start gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-5xl mx-auto">
        <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
          <label
            htmlFor="avatarUpload"
            className="block cursor-pointer w-full h-full transition-transform duration-300 hover:scale-105"
          >
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
          </label>

          <div
            onClick={() => setViewEdit(!viewEdit)}
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Pencil className="w-6 h-6 text-white" />
          </div>

          {viewEdit && (
            <div
              ref={viewEditRef}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border dark:bg-black shadow-md rounded-lg z-10 text-sm w-32"
            >
              <button
                onClick={() => {
                  setIsPreviewOpen(true);
                  setViewEdit(false);
                }}
                className="w-full text-center px-4 py-2 hover:bg-gray-100"
              >
                👁️ View
              </button>
              <label
                htmlFor="avatarUpload"
                className="block text-center px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-white"
              >
                ✏️ Edit
              </label>
              <input
                id="avatarUpload"
                type="file"
                name="avatar"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  handleImageChange(e);
                  setViewEdit(false);
                }}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user?.recruiterInfo?.name || user?.name || "John Doe"}
            </h1>
            <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {userRole === "candidate"
                ? "Job Seeker"
                : userRole === "recruiter"
                ? "Recruiter"
                : "Unknown"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600">
            <span>{user?.email || "johndoe@gmail.com"}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{user?.phone || "+1234567890"}</span>
          </div>

          <div className="pt-2 sm:pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="w-full sm:w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {profileCompletion}% Complete
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete your profile to increase visibility
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-full shadow-md"
                disabled={isUploading}
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleImageUpload}
                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full shadow-md flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                    <span className="text-white font-medium">Uploading...</span>
                  </>
                ) : (
                  <span className="text-white font-medium px-2">Upload</span>
                )}
              </button>
            </div>
            {uploadError && (
              <div className="absolute top-12 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {uploadError}
              </div>
            )}
            {isPreviewOpen && previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
