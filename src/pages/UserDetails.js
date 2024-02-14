import React from "react";
import ViewUserDetails from "../components/Users/ViewUserDetails";
import { useParams } from "react-router";

const UserDetails = () => {
  const params = useParams();
  return <ViewUserDetails userID={params?.id} />;
};

export default UserDetails;
