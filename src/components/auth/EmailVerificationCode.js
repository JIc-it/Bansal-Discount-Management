import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../../../src/assets/Images/icons/arrow-left.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOTPFromEmail, verifyOTP } from "../../axiosHandle/authHandle";
import { toast } from "react-toastify";
import logotemp from '../../../src/assets/Images/login.png'

const EmailVerificationCode = () => {
  const params = useParams();
  const navigate = useNavigate();
  const emailID = params?.id;
  const userID = params?.userID;

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      verificationOTP: "",
      submit: null,
    },
    validationSchema: Yup.object({
      verificationOTP: Yup.string().required("Verification OTP is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true);
        verifyOTP({ otp: values.verificationOTP, user_id: userID })
          .then((data) => {
            navigate(`/resetloginpassword/${userID}`);
            toast.success("OTP Verified Successfully.");
            // setIsLoading(false);
          })
          .catch((error) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: error.response.data?.detail }); // Set the error message in formik
            helpers.setSubmitting(false);
            console.error("Error fetching lead data:", error);
          });
        setIsLoading(false);
      } catch (err) {
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setIsLoading(false); // Reset loading state on error
      }
    },
  });

  const resendMail = async () => {
    getOTPFromEmail(emailID)
      .then((data) => {
        toast.success("OTP sent successfully.");
      })
      .catch((error) => {
        toast.error("error in get OTP.");
      });
  };

  return (
    <div className="authincation">
      <div className="row">
        <div className="col-lg-6">
        <h1
            style={{
              color: "#fff",
              position: "absolute",
              top: "23%",
              left: "3%",
            }}
          >
            Bansal Discount Management
          </h1>

          <img
            src={logotemp}
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
                    navigate("/forgotpassword");
                  }}
                >
                  <img src={leftArrow} alt="leftArrow" />
                  <span className="mx-2">Back</span>
                </div>
                <span className="forgot-description ">
                  The verification code has been sent to{" "}
                  <span className="forgot-email">{emailID}</span>
                </span>
                <div className="my-2">
                  <span
                    className="forgot-email"
                    onClick={() => {
                      navigate("/forgotpassword");
                    }}
                  >
                    Change Email
                  </span>
                  <span className="forgot-email mx-2" onClick={resendMail}>Resend Email</span>
                </div>
                <input
                  type="text"
                  className="form-control "
                  name="verificationOTP"
                  value={formik.values.verificationOTP}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Verification Code"
                  maxLength={50}
                />
                {formik.touched.verificationOTP &&
                formik.errors.verificationOTP ? (
                  <div className="error">{formik.errors.verificationOTP}</div>
                ) : null}
              </div>

              <div className="text-center mb-4">
                <button type="submit" className="btn btn-primary btn-block mb-2">
                  Verify{" "}
                </button>
                {formik.errors.submit && (
                  <span color="error " style={{ color: "#b94b4b" }}>{formik.errors.submit}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationCode;
