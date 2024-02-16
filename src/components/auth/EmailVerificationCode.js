import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../../../src/assets/Images/icons/arrow-left.png";

const EmailVerificationCode = () => {
  const params = useParams();
  const navigate = useNavigate();
  const emailID = params?.id;

  const handleLogin = () => {};
  return (
    <div className="authincation">
      <div className="row">
        <div className="col-lg-6">
          <img
            src="/assets/login_banner.png"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div
          className="col-lg-6  my-3"
          style={{
            display: "grid",
            alignItems: "center",
            paddingRight: "3rem",
          }}
        >
          <div className="verification-form-container">
            <form
              id="loginForm"
              action="https://w3crm.dexignzone.com/xhtml/index.html"
              autoComplete="off"
            >
              <div className="mb-4">
                <label
                  className="mb-1 "
                  style={{ color: "#000", fontWeight: "500", fontSize: "14px" }}
                >
                  Forgot Password
                </label>
                <div
                  className="back-icon-area my-3 cursor-pointer"
                  onClick={() => {
                    navigate("/forgotpassword");
                  }}
                >
                  <img src={leftArrow} alt="leftArrow" />
                  <span className="mx-2">Back</span>
                </div>
                <span className="forgot-description ">
                  The verification code has been sent to <span className="forgot-email">{emailID}</span>
                </span>
                <div className="my-2">
                  <span className="forgot-email"  onClick={() => {
                    navigate("/forgotpassword");
                  }}>Change Email</span>
                  <span className="forgot-email mx-2">Resend Email</span>
                </div>
                <input
                  type="text"
                  className="form-control "
                  // value={credentials.email}
                  // onChange={(e) =>
                  //   setCredentials({ ...credentials, email: e.target.value })
                  // }
                  placeholder="Verification Code"
                  maxLength={50}
                />
              </div>

              <div className="text-center mb-4">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Verify{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationCode;
