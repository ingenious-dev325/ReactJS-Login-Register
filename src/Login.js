import "./auth.css";
import avatar from "./profileimg.png";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
// import Constants from "../utils/Constants";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [regData, setRegData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = () => {
    const url1 =
      "https://0xi83ut1mc.execute-api.ap-south-1.amazonaws.com/dev/auth/login";
    axios
      .post(url1, regData)
      .then((response) => {
        const data = JSON.parse(response.data.body);
        console.log("Response====>", JSON.parse(response.data.body));
        if (data.status == 200) {
          const userData = {
            // token: response.data.token,
            user: data.body.id,
            role: data.body.role
          };
          console.log("UserData====>",userData);
          
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/dashboard");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log("Error====>", error);
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      });
  };

  return (
    <div className="login-cont">
      <div className="auth-cont">
        <h2 className="auth-heading">Welcome back!</h2>

        <div className="details-cont">
          <p>Email</p>
          <input
            name="email"
            onChange={handleChange}
            className="inputcom"
            placeholder="Enter Your Name"
          />

          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="inputcom"
            placeholder="Enter Your Password"
          />
          {/* {errorMessage === '' ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>} */}

          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}

          <Link className="auth-link" 
          // to={"/login"}
          >
            Forgot your password?
          </Link>
          <p className="contract">
            Need an account? &nbsp;
            <Link className="auth-link-register" 
            to={"./register"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#000000",
  "&:hover": {
    backgroundColor: "#000000",
  },
}));
