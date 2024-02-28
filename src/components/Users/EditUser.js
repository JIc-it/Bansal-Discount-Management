import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from "react-bootstrap/Offcanvas";
import infoIcon from "../../../src/assets/Images/icons/info-icon.png";
import userIcon from "../../../src/assets/Images/icons/userIcon.png";
import { FileUploader } from "../common/FileUploader";
import { createUsers } from "../../axiosHandle/usersServices";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object().shape({
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test("fileSize", "Profile picture must be 100x100 pixels", (value) => {
      if (!value) return true; // Allow empty values (e.g., if no file is selected)
      const image = new Image();
      image.src = URL.createObjectURL(value);
      return new Promise((resolve, reject) => {
        image.onload = () => {
          const width = image.naturalWidth;
          const height = image.naturalHeight;
          if (width === 100 && height === 100) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
        image.onerror = () => {
          reject(new Error("Failed to load the image"));
        };
      });
    }),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Phone is required"),
  role: Yup.string().required("Role is required"),
});

export default function EditUser({
  open,
  setOpen,
  setIsRefetch,
  isRefetch,
  userListData,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseOffcanvas = () => {
    setOpen(false);
    setIsLoading(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: userListData?.name,
      profilePicture: null,
      email: userListData?.email,
      mobile: userListData?.mobile,
      role: userListData?.role,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let fields = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        image: values.profilePicture,
        role: values.role,
      };
      createUsers(fields)
        .then((data) => {
          console.log(" Request list data", data);
          setIsRefetch(!isRefetch);
          handleCloseOffcanvas();
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("profilePicture", file);
  };

  return (
    <Offcanvas
      show={open}
      onHide={handleCloseOffcanvas}
      placement="end"
      style={{ overflow: "auto" }}
      className="create-user-offcanvas"
    >
      <Offcanvas.Header closeButton onClick={handleCloseOffcanvas}>
        <h5 style={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
          Edit User
        </h5>
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit} style={{ padding: "1rem" }}>
        <label htmlFor="" style={{ fontWeight: "500" }}>
          Profile Picture <span style={{ color: "red" }}>*</span>
        </label>
        <FileUploader handleFileChange={handleFileChange} formik={formik} />
        <div className="info-message">
          <img src={infoIcon} alt="infoIcon" />
          <span className="mx-2">
            Please upload a profile picture with dimensions of 100 X 100 pixels
            for optimal display.
          </span>
        </div>
        <div className="user-image-section my-2">
          {formik.values.profilePicture ? (
            <img
              src={userListData?.profilePicture}
              alt="Uploaded Profile Picture"
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          ) : (
            <div className="user-image">
              <img src={userIcon} alt="userIcon" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            className="form-control"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            maxLength={50}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            className="form-control form-control-sm"
            placeholder="Enter the Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Phone <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-12" style={{ display: "flex" }}>
            <input
              type="number"
              placeholder="Enter the Phone Number"
              className="form-control"
              name="mobile"
              value={
                formik.values.mobile &&
                formik.values.mobile.replace(/\D/g, "").slice(0, 10)
              }
              onChange={(e) => {
                const inputValue = e.target.value;
                const sanitizedValue = inputValue
                  .replace(/\D/g, "")
                  .slice(0, 10); // Remove non-digit characters and limit to 10 digits
                formik.setFieldValue("mobile", sanitizedValue); // Update the formik field
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Role <span style={{ color: "red" }}>*</span>
          </label>
          <select
            type="text"
            className="form-select status_selector"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Admin">Admin</option>
            <option value="MOD">MOD</option>
            <option value="HR">HR</option>
            <option value="MD">MD</option>
            <option value="BM">BM</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="error">{formik.errors.role}</div>
          ) : null}
        </div>
        <div className="create-user-button-area mt-5">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleCloseOffcanvas}
            style={{
              flex: 1,
              background: "#162037",
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            type="submit"
            style={{
              flex: 1,
              background: "#0BA0DC",
            }}
          >
            {isLoading ? <CircularProgress /> : "Confirm"}
          </button>
        </div>
      </form>
    </Offcanvas>
  );
}
