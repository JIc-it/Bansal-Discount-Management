import axiosInstance from "./authHandle";
const discountRequestURL = "/discount/";

export const getDiscountRequest = (data) => {
  return axiosInstance
    .get(discountRequestURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
