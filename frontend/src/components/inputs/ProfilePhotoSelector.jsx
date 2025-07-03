import { useRef, useState } from "react";
import { FaUser, FaUpload, FaTrash } from "react-icons/fa";
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

const onChooseFile = () => {
  if (inputRef.current) {
    inputRef.current.value = null; // Reset to allow re-selection
    inputRef.current.click();
  }
};

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative">
          <FaUser className="text-4xl text-primary" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer  "
          >
          </button>
          <FaUpload  className="cursor-pointer" onClick={onChooseFile} />
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1  "
            onClick={handleRemoveImage}
          >
            <FaTrash className="cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
