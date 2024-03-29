import axiosInstance from "./authHandle";
const discountRequestURL = "/discount/";

export const getDiscountRequest = (requestSearch, seletedStatus) => {
  return axiosInstance
    .get(discountRequestURL, {
      params: {
        search: requestSearch || "",
        status: seletedStatus || "",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getIndivitualDiscountRequest = (id) => {
  return axiosInstance
    .get(`${discountRequestURL}${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
