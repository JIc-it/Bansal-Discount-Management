import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import infoIcon from "../../../src/assets/Images/icons/info-icon.png";
import userIcon from "../../../src/assets/Images/icons/userIcon.png";
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
export default function CreateUser({
  open,
  setOpen,
  setIsContractorAdded,
  isContractorAdded,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [locationList, setLocationList] = useState();
  const [stateList, setStateList] = useState();

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
      className='create-user-offcanvas'
    >
      <Offcanvas.Header closeButton onClick={handleCloseOffcanvas}>
        <h5 style={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
          Create New User
        </h5>
      </Offcanvas.Header>
      <form
        // onSubmit={formik.handleSubmit}
        style={{ padding: "1rem" }}
      >
        <label htmlFor="" style={{ fontWeight: "500" }}>
          Profile Picture <span style={{ color: "red" }}>*</span>
        </label>
        <FileUploader />
        <div className="info-message">
          <img src={infoIcon} alt="infoIcon" />
          <span className="mx-2">
            Please upload a profile picture with dimensions of 100 X 100 pixels
            for optimal display.
          </span>
        </div>
        <div className="user-image-section my-2">
          <div className="user-image">
            <img src={userIcon} alt="userIcon" />
          </div>
        </div>
        <div>
          <label htmlFor="" style={{paddingTop:"10px", fontWeight: "500" }}>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter the Name"
            className="form-control"
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
            maxLength={20}
            // onBlur={formik.handleBlur}
          />
          {/* {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="" style={{paddingTop:"10px", fontWeight: "500" }}>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            className="form-control form-control-sm"
            placeholder="Enter the Email Address"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            maxLength={50}
            // onBlur={formik.handleBlur}
          />
          {/* {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="" style={{ paddingTop:"10px",fontWeight: "500" }}>
            Phone <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-12" style={{ display: "flex" }}>
            <input
              type="number"
              placeholder="Enter the Phone Number"
              className="form-control"
              name="mobile"
              // value={formik.values.mobile}
              // onChange={(e) => {
              //   const inputValue = e.target.value;
              //   if (inputValue.length <= 10) {
              //     const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
              //     formik.handleChange("mobile")(sanitizedValue); // Update the formik field
              //   }
              // }}
              // onBlur={formik.handleBlur}
            />
          </div>

          {/* {formik.touched.mobile && formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
          ) : null} */}
        </div>

        <div>
          <label htmlFor="" style={{paddingTop:"10px", fontWeight: "500" }}>
            Role <span style={{ color: "red" }}>*</span>
          </label>
          <select
            type="text"
            className="form-select  status_selector"
            name="role"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.idType || ""}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* {idTypeList &&
                  idTypeList.length > 0 &&
                  idTypeList.map((item, i) => {
                    return (
                      <option value={item.id} key={`statusList-${i}`}>
                        {item.name}
                      </option>
                    );
                  })} */}
          </select>
          {/* {formik.touched.idType && formik.errors.idType ? (
                <div className="error">{formik.errors.idType}</div>
              ) : null} */}
        </div>

        <div>
          <label htmlFor="" style={{paddingTop:"10px", fontWeight: "500" }}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-12" style={{ display: "flex" }}>
            <input
              type="password"
              placeholder="Enter the password"
              className="form-control"
              name="password"
              // value={formik.values.mobile}
              // onChange={(e) => {
              //   const inputValue = e.target.value;
              //   if (inputValue.length <= 10) {
              //     const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
              //     formik.handleChange("mobile")(sanitizedValue); // Update the formik field
              //   }
              // }}
              // onBlur={formik.handleBlur}
            />
          </div>

          {/* {formik.touched.mobile && formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
          ) : null} */}
        </div>
        <div>
          <label htmlFor="" style={{paddingTop:"10px", fontWeight: "500" }}>
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-12" style={{ display: "flex" }}>
            <input
              type="password"
              placeholder="Enter the confirm password"
              className="form-control"
              name="confirmPassword"
              // value={formik.values.mobile}
              // onChange={(e) => {
              //   const inputValue = e.target.value;
              //   if (inputValue.length <= 10) {
              //     const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
              //     formik.handleChange("mobile")(sanitizedValue); // Update the formik field
              //   }
              // }}
              // onBlur={formik.handleBlur}
            />
          </div>

          {/* {formik.touched.mobile && formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
          ) : null} */}
        </div>
        <div className="create-user-button-area mt-5">
          {/* <div style={{ width: "48%" }}> */}
          <button
            className="btn btn-success"
            type="submit"
            style={{
              flex: 1,
              background: '#162037',
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
              background: '#0BA0DC',

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
