import React, { useState, useEffect } from "react";
import { getProfileRequest } from "../../axiosHandle/profileHandle";
import leftArrow from "../../../src/assets/Images/icons/arrow-left.png";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate=useNavigate()
  const [profile_data, setProfileData] = useState({
    name: "",
    user_id: "",
    email: "",
    mobile: "",
    district_name: "",
  });
  console.log("profile", profile_data);

  useEffect(() => {
    getProfileRequest()
      .then((data) => {
        console.log("data", data);
        setProfileData((prevData) => ({
          ...prevData,
          name: data.name,
          user_id: data.user_id,
          email: data.email,
          mobile: data.mobile,
          district_name: data.district,
        }));
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <div className="content-body" >
      {/* row */}
      <div className="container">
        <div style={{ display: "flex", cursor: "pointer" }}>
          <div
            className="mb-0"
            style={{
              display: "flex",
              marginLeft: "15px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            <div
              className="back-icon-area cursor-pointer"
              style={{ fontSize: "12px" }}
            >
              <img src={leftArrow} alt="leftArrow" onClick={()=>(navigate(-1))} />
              <span className="mx-2">Back</span>
            </div>
            Profile
          </div>
        </div>
        <br></br>
        <div className="row" style={{ marginLeft: "4px" }}>
          <div className="col-xl-3 col-sm-6">
            <div className="card box-hover">
              <div className="card-body">
                <div className="events">
                  <div className=" event-scroll">
                    <div className="event-media">
                      <div className="d-flex align-items-center">
                        <div className="event-box">
                          <h5 className="mt-2" style={{ color: "black" }}>
                            {profile_data.name?.slice(0, 2).toUpperCase()}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="event-data ms-2">
                      <h5 className="mb-0">{profile_data.name}</h5>
                      <span>{profile_data.user_id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-sm-12">
            <div className="card box-hover">
              <div className="card-header">
                <h5 className="mb-0">Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <span>Email:</span>
                    <br />
                    <span>Mobile:</span>
                    <br />
                    {/* <span>Location:</span>
                    <br /> */}
                  </div>
                  <div className="col-sm-6 text-right">
                    <span>{profile_data.email}</span>
                    <br />
                    <span>{profile_data.mobile}</span>
                    <br />
                    {/* <span>{profile_data.district_name}</span>
                    <br /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
