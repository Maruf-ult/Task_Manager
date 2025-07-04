import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Field name must match backend

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData);
    console.log(response.data); // 👈 Should contain imageUrl
    return response.data; // 👈 Make sure only the data part is returned
  } catch (error) {
    console.error("Error uploading the image", error);
    throw error;
  }
};

export default uploadImage;
