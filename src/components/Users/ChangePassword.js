import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import eyeOpen from "../../../src/assets/Images/icons/eye-open.png";
import eyeClose from "../../../src/assets/Images/icons/eye-close.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeUsersPassword } from "../../axiosHandle/usersServices";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChangePassword({ open, setOpen, userID }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleCloseOffcanvas = () => {
    setOpen(false);
    setIsLoading(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("New Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      const data = {
        new_password: values.password,
        confirm_password: values.confirmPassword,
      };
      if (!isLoading) {
        setIsLoading(true);
        try {
          await changeUsersPassword(userID, data);
          toast.success("Password changed successfully.");
          handleCloseOffcanvas();
        } catch (error) {
          console.error("Error changing password:", error);
          helpers.setStatus({ success: false });
          helpers.setErrors({
            submit: error.response?.data?.error || "Password change failed.",
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <Offcanvas
      show={open}
      onHide={handleCloseOffcanvas}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header closeButton onClick={handleCloseOffcanvas}>
        <h5 style={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
          Change Password
        </h5>
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit} className="px-3">
        <div>
          <label
            htmlFor="password"
            style={{ paddingTop: "10px", fontWeight: "500" }}
          >
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the Name"
              className="form-control"
              id="password"
              name="password"
              maxLength={20}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={eyeClose} alt="" />
              ) : (
                <img src={eyeOpen} alt="" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            style={{ paddingTop: "10px", fontWeight: "500" }}
          >
            New Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showChangePassword ? "text" : "password"}
              placeholder="Enter the Name"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              maxLength={20}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              type="button"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              {showChangePassword ? (
                <img src={eyeClose} alt="" />
              ) : (
                <img src={eyeOpen} alt="" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <div
          className="create-user-button-area mt-5"
          style={{ position: "absolute", bottom: "1rem", width: "93%" }}
        >
          <button
            className="btn btn-success"
            type="button"
            style={{ flex: 1, background: "#162037" }}
            onClick={handleCloseOffcanvas}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            type="submit"
            style={{ flex: 1, background: "#0BA0DC" }}
          >
            {isLoading ? <CircularProgress size={14} /> : "Confirm"}
          </button>
        </div>
        {formik.errors.submit && (
          <div className="error my-2 text-left">{formik.errors.submit}</div>
        )}
      </form>
    </Offcanvas>
  );
}
