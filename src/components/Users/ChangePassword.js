import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import eyeOpen from "../../../src/assets/Images/icons/eye-open.png";
import eyeClose from "../../../src/assets/Images/icons/eye-close.png";
// import {
//   getAllLocations,
//   getAllStates,
// } from "../../../axiosHandle/commonServicesHandle";
// import { createUser, stateIdFilter } from "../../../axiosHandle/userHandle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "react-simple-widgets";
import { toast } from "react-toastify";
import { FileUploader } from "../common/FileUploader";

const offcanvasStyle = {
  width: "365px",
  height: "100%",
  // backgroundColor: 'lightgray',
  display: "flex",
  marginLeft: 18,
  marginTop: 20,
  flexDirection: "column",
};
export default function ChangePassword({
  open,
  setOpen,
  setIsContractorAdded,
  isContractorAdded,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [locationList, setLocationList] = useState();
  const [stateList, setStateList] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  // useEffect(() => {
  //   getAllLocations()
  //     .then((data) => {
  //       setLocationList(data.results);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching lead data:", error);
  //     });
  //   getAllStates()
  //     .then((data) => {
  //       setStateList(data.results);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching lead data:", error);
  //     });
  // }, []);

  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  // const validationSchema = Yup.object({
  //   name: Yup.string()
  //     .required("Name is required")
  //     .max(20, "Name must be at most 20 characters"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   mobile: Yup.string()
  //     .required("Mobile is required")
  //     .matches(/^\d{10}$/, "Mobile must be a 10-digit number"),
  //   district: Yup.mixed().test(
  //     "isDistrictSelected",
  //     "District is required",
  //     function (value, context) {
  //       const { parent } = context;
  //       const stateValue = parent.state;

  //       // Check if both state and district are not selected
  //       if (
  //         (!stateValue ||
  //           stateValue.id === "0" ||
  //           stateValue.name === "State") &&
  //         (!value || value.id === "0" || value.name === "District")
  //       ) {
  //         return this.createError({
  //           path: this.path,
  //           message: "District is required",
  //         });
  //       }

  //       // Check if the state is selected before validating the district
  //       if (
  //         !stateValue ||
  //         stateValue.id === "0" ||
  //         stateValue.name === "State"
  //       ) {
  //         return this.createError({
  //           path: this.path,
  //           message: "Please select a state",
  //         });
  //       }

  //       return value && value.id !== "0" && value.name !== "District"
  //         ? true
  //         : this.createError({
  //           path: this.path,
  //           message: "District is required",
  //         });
  //     }
  //   ),
  //   state: Yup.mixed().test(
  //     "isStateSelected",
  //     "State is required",
  //     function (value) {
  //       return value && value.id !== "0" && value.name !== "State";
  //     }
  //   ),

  //   password: Yup.string()
  //     .required("Password is required")
  //     .matches(
  //       passwordRegex,
  //       "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
  //     ),
  //   confirmPassword: Yup.string()
  //     .required("Confirm Password is required")
  //     .oneOf([Yup.ref("password")], "Passwords must match"),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     mobile: "",
  //     district: { id: "0", name: "District" },
  //     state: { id: "0", name: "state" },
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     setIsLoading(true);
  //     if (!isLoading) {
  //       try {
  //         const data = {
  //           name: values.name,
  //           email: values.email,
  //           mobile: values.mobile,
  //           password1: values.password,
  //           password2: values.confirmPassword,
  //           district: values.district.id,
  //           state: values.state.id,
  //           role: "Contractor",
  //         };

  //         const contractorData = await createUser(data);
  //         console.log(contractorData);
  //         if (contractorData) {
  //           setIsContractorAdded(!isContractorAdded);
  //           toast.success("Contractor created successfully!");
  //           setOpen(false);
  //           setIsLoading(false);
  //         } else {
  //           console.error(
  //             "Error while creating Contractor:",
  //             contractorData.error
  //           );
  //           setIsLoading(false);
  //         }
  //         setIsLoading(false);
  //       } catch (err) {
  //         console.log(err);
  //         err.response.data.email && toast.error(err.response.data.email[0]);
  //         err.response.data.mobile && toast.error(err.response.data.mobile[0]);
  //         setIsLoading(false);
  //       }
  //     }
  //   },
  // });

  const handleCloseOffcanvas = () => {
    setOpen(false);
    setIsLoading(false);
  };

  // const handleListDistrict = (id) => {
  //   stateIdFilter(id)
  //     .then((data) => {
  //       setLocationList(data.results);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching lead data:", error);
  //     });
  // };

  // const handleDistrictChange = (e) => {
  //   const selectedOption = e.target.options[e.target.selectedIndex];
  //   const id = selectedOption.getAttribute("id");
  //   const districtName = e.target.value;

  //   formik.setValues({
  //     ...formik.values,
  //     district: { id, name: districtName },
  //   });
  // };

  // const handleStateChange = async (e) => {
  //   const selectedOption = e.target.options[e.target.selectedIndex];
  //   const id = selectedOption.getAttribute("id");
  //   const stateName = e.target.value;
  //   handleListDistrict(id);

  //   formik.setValues({
  //     ...formik.values,
  //     state: { id, name: stateName },
  //   });
  // };

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
      <form
        // onSubmit={formik.handleSubmit}
        className="px-3"
        // style={{ padding: "1rem" }}
      >
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the Name"
              className="form-control"
              name="name"
              maxLength={20}
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
          {/* 
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null} 
      */}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop: "10px", fontWeight: "500" }}>
            Change Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showChangePassword ? "text" : "password"}
              placeholder="Enter the Name"
              className="form-control"
              name="name"
              maxLength={20}
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
          {/* 
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null} 
      */}
        </div>

        <div
          className="create-user-button-area mt-5"
          style={{
            position: "absolute",
            bottom: "1rem",
            width: "93%",
          }}
        >
          {/* <div style={{ width: "48%" }}> */}
          <button
            className="btn btn-success"
            type="submit"
            style={{
              flex: 1,
              background: "#162037",
              // width: "47%",
              // position: "absolute",
              // bottom: "1rem",
            }}
          >
            Cancel
          </button>
          {/* </div> */}
          {/* <div style={{ width: "48%" }}> */}
          <button
            className="btn btn-success"
            type="submit"
            style={{
              flex: 1,
              background: "#0BA0DC",

              // width: "47%",
              // position: "absolute",
              // bottom: "1rem",
            }}
          >
            Confirm
          </button>
          {/* </div> */}
        </div>
      </form>
    </Offcanvas>
  );
}
