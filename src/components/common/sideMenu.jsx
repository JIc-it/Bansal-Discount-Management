import { React, useState, useEffect } from "react";
import requestIconDark from "../../../src/assets/Images/icons/request-dark.png";
import userIcon from "../../../src/assets/Images/icons/user-icon.png";
import {
  Sidebar,
  Menu,
  MenuItem,
  SidebarContent,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import { Link } from "react-router-dom";
import { getModulePermission } from "../../axiosHandle/authHandle";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import logo from "../../assets/Images/logo.png";

const getUserPermissions = (id) => {
  const getUserPermission = `/account/custom_permission/retrieve/${id}/`;

  return fetch(getUserPermission)
    .then((response) => {
      console.log("API Response:", response);
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching user permissions:", error);
      return {};
    });
};
export default function SideMenu() {
  const userRole = localStorage.getItem("role");

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const location = useLocation();
  const toggle = () => {
    toggleSidebar();
  };
  const isMenuItemActive = (menuItemPath) => {
    return location.pathname.includes(menuItemPath);
  };

  const getCurrentUserId = () => {
    return "39865dd5-f2e5-4561-93cc-701f2f2a3302";
  };

  return (
    <Sidebar
      backgroundColor="#F8F9F9"
      rtl={false}
      style={{
        position: "fixed", // Make the sidebar fixed
        top: 0, // Stick it to the top
        bottom: 0, // Extend it to the bottom
        // width: "240px", // Set the desired width
        color: "white",
        // marginTop: "70px",
      }}
    >
      <a href="/requests" className="brand-logo  ">
        <img
          src={logo}
          alt="Bansal Logo"
          width="70"
          height="45"
          style={{
            marginLeft: "65px",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
      </a>
      <Menu className="menu-container">
        <MenuItem
          className={`menu-item `}
          // onClick={() => toggle()}
        >
          <Link
            to="/requests"
            style={{ color: "black" }}
            className="menu-link "
          >
            <div
              className={` 
          ${isMenuItemActive("/requests") ? "active-menu" : "menu-list"}`}
            >
              <img src={requestIconDark} alt="" className="menu-icon" />
              <span>Requests</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem
          className={`menu-item `}
          // onClick={() => toggle()}
        >
          <Link to="/users" style={{ color: "black" }} className="menu-link ">
            <div
              className={` 
          ${isMenuItemActive("/users") ? "active-menu" : "menu-list"}`}
            >
              <img src={userIcon} alt="" className="menu-icon" />
              <span>Users</span>
            </div>
          </Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
