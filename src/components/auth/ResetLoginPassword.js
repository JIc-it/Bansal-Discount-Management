import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loginRequest,
  verifyAccessToken,
  refreshAccessToken,
  resetLoginpassword,
} from "../../axiosHandle/authHandle";
import { logoutRequest } from "../../axiosHandle/authHandle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ResetLoginPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userID = params?.id;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string().max(50).required("Password is required"),
      // .matches(
      //   passwordRegex,
      //   "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      // ),
      confirmPassword: Yup.string()
        .max(50)
        .required("Confirm Password is required")
        //   .matches(
        //     passwordRegex,
        //     "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
        //   )
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          user_id: userID,
          new_password: values.password,
        };
        const response = await resetLoginpassword(data);
        console.log(response);
        if (response.status==200) {
         
          toast.success("Password reset successful.");
          navigate("/");
          console.log("sucess");
        }
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err.response?.data?.error || "Reset Failed.",
        });
        helpers.setSubmitting(false);
      }
    },
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  //   useEffect(() => {
  //     document.getElementById("loginForm").autocomplete = "off";
  //     const checkTokens = async () => {
  //       const existingAccessToken = localStorage.getItem("access_token");
  //       const existingRefreshToken = localStorage.getItem("refresh_token");

  //       if (existingAccessToken && existingRefreshToken) {
  //         const isAccessTokenValid = await verifyAccessToken();

  //         if (isAccessTokenValid) {
  //           navigate("/requests");
  //         } else {
  //           try {
  //             const newAccessToken = await refreshAccessToken();

  //             if (newAccessToken) {
  //               localStorage.setItem("access_token", newAccessToken);
  //               navigate("/requests");
  //             }
  //           } catch (refreshError) {
  //             const refresh = localStorage.getItem("refresh_token");
  //             if (refresh) {
  //               const data = { refresh };
  //               logoutRequest(data);
  //             }
  //             localStorage.removeItem("access_token");
  //             localStorage.removeItem("refresh_token");
  //             console.error("Error refreshing access token:", refreshError);
  //           }
  //         }
  //       }
  //     };

  //     checkTokens();
  //   }, [navigate]);

  return (
    <div className="authincation">
      <div className="row">
        <div className="col-md-6">
          <img
            src="/assets/login_banner.png"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div
          className="col-md-6"
          style={{
            display: "grid",
            alignItems: "center",
          }}
        >
          <div
            className="login-form"
            // style={{ position: "relative", top: "250px", left: "120px" }}
          >
            <form
              id="loginForm"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="mb-4">
                <label className="mb-1 text-dark">Reset Password</label>
              </div>

              <div className="mb-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="dz-password"
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  maxLength={20}
                  autoComplete="off"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye-slash" />
                  )}
                </span>
              </div>
              <div className="mb-4 position-relative">
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  id="dz-password"
                  className="form-control"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm Password"
                  maxLength={20}
                  autoComplete="off"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
                <span
                  onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye-slash" />
                  )}
                </span>
              </div>

              <div className="form-row d-flex justify-content-between mt-4 mb-2"></div>
              <div className=" mb-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block text-center"
                >
                  Confirm
                </button>
                {formik.errors.submit && (
                  <div className="error my-2 text-left">
                    {formik.errors.submit}
                  </div>
                )}
              </div>
            </form>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ResetLoginPassword;
