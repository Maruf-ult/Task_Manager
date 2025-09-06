import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData);
    console.log("Full Axios Response:", response); // 👀 Check here
    console.log("Response Data:", response.data);

    if (!response || !response.data) {
      throw new Error("No response data from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error uploading the image:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export default uploadImage;
