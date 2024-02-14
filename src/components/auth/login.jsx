import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  verifyAccessToken,
  refreshAccessToken,
} from "../../axiosHandle/authHandle";
import { logoutRequest } from "../../axiosHandle/authHandle";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.getElementById("loginForm").autocomplete = "off";
    const checkTokens = async () => {
      const existingAccessToken = localStorage.getItem("access_token");
      const existingRefreshToken = localStorage.getItem("refresh_token");

      if (existingAccessToken && existingRefreshToken) {
        const isAccessTokenValid = await verifyAccessToken();

        if (isAccessTokenValid) {
          navigate("/requests");
        } else {
          try {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
              localStorage.setItem("access_token", newAccessToken);
              navigate("/requests");
            }
          } catch (refreshError) {
            const refresh = localStorage.getItem("refresh_token");
            if (refresh) {
              const data = { refresh };
              logoutRequest(data);
            }
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            console.error("Error refreshing access token:", refreshError);
          }
        }
      }
    };

    checkTokens();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const { email, password } = credentials;

      if (email.length > 50) {
        setError("Email must be at most 50 characters.");
        return;
      }

      // Validate password length
      if (password.length > 20) {
        setError("Password must be at most 20 characters.");
        return;
      }

      const data = {
        email,
        password,
      };

      const { access, refresh, role } = await loginRequest(data);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("role", role);

      setMsg("Login Successful. Redirecting to Dashboard");
      navigate("/requests");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="authincation">
      <div className="row">
        <div className="col-lg-6">
          <img
            src="/assets/login_banner.png"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="col-lg-4">
          <div
            className="login-form"
            style={{ position: "relative", top: "250px", left: "120px" }}
          >
            <form
              id="loginForm"
              action="https://w3crm.dexignzone.com/xhtml/index.html"
              autoComplete="off"
            >
              <div className="mb-4">
                <label className="mb-1 text-dark">Log in</label>
                {error && <p className="text-danger">{error}</p>}
                {msg && <p className="text-primary">{msg}</p>}
                <input
                  type="text"
                  className="form-control form-control"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  placeholder="Unique id"
                  maxLength={50}
                />
              </div>

              <div className="mb-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="dz-password"
                  className="form-control"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  placeholder="Password"
                  maxLength={20}
                />
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
              <div className="text-center mb-4">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </div>
              <div className="mb-4">
                <a
                  href="/forgotpassword"
                  className="btn-link text-primary"
                  style={{ marginLeft: "285px" }}
                >
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