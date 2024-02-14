import * as React from "react";
import bellIcon from "../assets/Images/icons/bell-icon.png";

function Notification(props) {
  return (
    <div className="notification-icon">
      <img src={bellIcon} alt="bellIcon" />
    </div>
  );
}

export default Notification;
