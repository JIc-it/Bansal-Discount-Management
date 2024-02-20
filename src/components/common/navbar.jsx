import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { getProfileRequest } from "../../axiosHandle/profileHandle";
import { NotificationList } from "../../axiosHandle/userHandle";
import Notification from "../../assets/notification";
import NotificationsOpen from "./notifications";
import logo from "../../assets/Images/logo.png";
import downArrow from "../../assets/Images/icons/down-arrow.png";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {/* &#x25bc; */}
  </a>
));

export default function Navbar() {
  const navigate = useNavigate();

  const [profile_data, setProfileData] = useState({
    name: "",
    user_id: "",
    email: "",
    mobile: "",
    district_name: "",
  });

  useEffect(() => {
    getProfileRequest()
      .then((data) => {
        console.log(" getProfileRequest data", data);
        
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

  const [count, setCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const showNotification = (condition) => {
    setShowNotifications(condition, showNotifications);
  };

  useEffect(() => {
    NotificationList()
      .then((data) => {
        console.log("data", data);
        setCount(data.count);
        setDataList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [showNotifications]);

  return (
    <>
      {/* <div
        className="nav-header"
        style={{
          height: "70px",
          width: "250px",
          position: "fixed",
          top: "0",
          borderRightWidth: "1px",
          borderRightStyle: "solid",
          borderColor: "#efefef",
        }}
      >
        <a href="/requests" className="brand-logo">
          <img
            src={logo}
            alt="Bansal Logo"
            width="70"
            height="45"
            style={{ marginLeft: "65px" }}
          />
        </a>
      </div> */}
      <div
        className="navbar-header"
        // style={{
        //   height: "70px",
        //   position: "fixed",
        //   top: "0px",
        //   // left: "250px",
        //   right: "0px",
        //   boxShadow: " 0px 2px 10px 0px #00000012",
        // }}
      >
        <div className="header-content">
          <nav className="">
            <div className="justify-content-end">
              <ul className=" header-right">
                {/* <li className="nav-item dropdown notification_dropdown">
                  <div className="dropdown-menu dropdown-menu-end">
                    <div
                      id="DZ_W_Notification1"
                      className="widget-media dz-scroll p-3"
                      style={{ height: "380px" }}
                    > */}
                {/* Notification items go here */}
                {/* </div>
                    <a className="all-notification" href="/">
                      See all notifications <i className="ti-arrow-end"></i>
                    </a>
                  </div>
                </li> */}
                <div
                  onClick={() => setShowNotifications(true)}
                  style={{ position: "relative", top: "15px" }}
                >
                  <Notification />
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 28,
                      color: "#B1292C",
                      fontSize: 15,
                      backgroundColor: "white",
                      width: 20,
                      textAlign: "center",
                      borderRadius: 50,
                    }}
                  >
                    <span>{count}</span>
                  </div>
                </div>
                <li className="nav-item ps-3">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                      <a
                        className="nav-link py-3"
                        href="/profile"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="header-info2 d-flex align-items-center">
                          <div className="header-media">
                            {profile_data.name?.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="header-info">
                            <h6 style={{ color: "#000" }}>
                              {profile_data.name}
                            </h6>
                            <p style={{ color: "#000" }}>
                              {profile_data.email}
                            </p>
                          </div>
                        </div>
                      </a>
                      <div className="profiledropdown">
                        <img
                          src={downArrow}
                          style={{ cursor: "pointer" }}
                          // className={`${openProfileDropdown && "invert-item"}`}
                          alt="downArrow"
                        />
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Link
                        to="/profile"
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        <Dropdown.Item>Profile</Dropdown.Item>
                      </Link>
                      <Link
                        to="/login"
                        style={{ color: "#888888" }}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        <Dropdown.Item>Logout </Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </nav>
          {showNotifications && (
            <NotificationsOpen
              dataList={dataList}
              open={showNotifications}
              setOpen={setShowNotifications}
              showNotification={showNotification}
            />
          )}
        </div>
      </div>
    </>
  );
}
