import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../axiosHandle/authHandle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email id is required"),
      password: Yup.string().max(50).required("Password is required"),
      // .matches(
      //   passwordRegex,
      //   "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      // ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          email: values.email,
          password: values.password,
        };
        const { access, refresh, role } = await loginRequest(data);
        if (access) {
          console.log(access, "access_token first");
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem("role", role);
          navigate("/requests");
          console.log("sucess");
        } else {
          toast.error("Login error");
        }
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err.response?.data?.error || "Login Failed.",
        });
        helpers.setSubmitting(false);
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);

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
                <label className="mb-1 text-dark">Log in</label>

                <input
                  type="text"
                  className="form-control form-control"
                  placeholder="Email id"
                  name="email"
                  maxLength={50}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Prevent the default form submission
                      formik.handleSubmit(); // Trigger form submission manually
                    }
                  }}
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

              <div className="form-row d-flex justify-content-between mt-4 mb-2"></div>
              <div className=" mb-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block text-center"
                >
                  Log In
                </button>
                {formik.errors.submit && (
                  <div className="error my-2 text-left">
                    {formik.errors.submit}
                  </div>
                )}
              </div>
              <div className="mb-4 text-end">
                <a href="/forgotpassword" className="btn-link text-primary ">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
