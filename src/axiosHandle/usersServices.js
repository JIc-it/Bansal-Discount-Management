import axiosInstance from "./authHandle";

const getusersList = "/account/users/";
const changePasswordUrl = "/account/user-reset-password";

export const getUsers = (requestSearch, seletedStatus) => {
  return axiosInstance
    .get(getusersList, {
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

export const createUsers = (data) => {
  return axiosInstance
    .post(getusersList, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getUserDetailsByID = (id) => {
  return axiosInstance
    .get(`${getusersList}${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const changeUsersPassword = (userID, data) => {
  return axiosInstance
    .post(`${changePasswordUrl}/${userID}/`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
