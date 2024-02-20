import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../src/assets/Images/icons/arrow-left.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOTPFromEmail } from "../../axiosHandle/authHandle";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailVerification: "",
      submit: null,
    },
    validationSchema: Yup.object({
      emailVerification: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true);
        getOTPFromEmail(values.emailVerification)
          .then((data) => {
            toast.success("OTP sent successfully.");
            navigate(
              `/verification/${formik.values.emailVerification}/${data.user_id}`
            );
            setIsLoading(false);
          })
          .catch((error) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: error.response.data?.detail }); // Set the error message in formik
            helpers.setSubmitting(false);
            console.error("Error fetching forgot verification data:", error);
          });

        setIsLoading(false);
        // navigate(`/verification/${formik.values.emailVerification}`)
      } catch (err) {
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setIsLoading(false); // Reset loading state on error
      }
    },
  });

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
              onSubmit={formik.handleSubmit}
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
                    navigate("/");
                  }}
                >
                  <img src={leftArrow} alt="leftArrow" />
                  <span className="mx-2">Back</span>
                </div>
                <input
                  type="text"
                  className="form-control "
                  name="emailVerification"
                  value={formik.values.emailVerification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email Address"
                  maxLength={50}
                />
                {formik.touched.emailVerification &&
                formik.errors.emailVerification ? (
                  <div className="error">{formik.errors.emailVerification}</div>
                ) : null}
              </div>

              <div className="text-center mb-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Send Verification Code
                </button>
                {formik.errors.submit && (
                  <span style={{ color: "#b94b4b" }} color="error-message">
                    {formik.errors.submit}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
