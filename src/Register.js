import "./auth.css";
import avatar from "./profileimg.png";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
// import validator from "validator";
// import Constants from "../utils/Constants";



export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const validate = (value) => {

    // if (validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //   setErrorMessage('')
    // } else {
    //   setErrorMessage('Is Not Strong Password')
    // }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };
  const navigate = useNavigate();
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      //   dispatch(uploadPic(reader.result));
      // setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = () => {
    //const url = "https://messenger-clo.herokuapp.com/auth";
    // if (user.pic) regData["pic"] = user.pic;
    // dispatch(authRegister(url, regData));
    const url1 = "https://0xi83ut1mc.execute-api.ap-south-1.amazonaws.com/dev/auth/login";
    axios.post(url1, regData)
      .then((response) => {
        console.log("Response====>", response);
        navigate("/App");
      })
      .catch((error) => {
        console.log("Error====>", error);
      })
  };

  const [regData, setRegData] = useState({
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isAdmin: false,
    fullName: "",
    email: "",
    password: "",
  });
  return (
    <div className="login-cont">
      <div className="auth-cont">
        <h2 className="auth-heading">Create an account</h2>
        <div>
          <div className="profile-pic">
            <input onChange={handleInputFile} type="file" name="" id="file" />
            <label htmlFor="file" id="uploadBtn">
              {/* <img id="photo" src={user.pic ? user.pic : avatar} /> */}
              <img id="photo" src={avatar} />
            </label>
          </div>
          <p className="profile-text">Choose Profile</p>
        </div>
        <div className="details-cont">
          <p>Name</p>
          <input onChange={handleChange} name="fullName" className="inputcom" placeholder="Enter Your Name" />

          <p>Email</p>
          <input onChange={handleChange} name="email" className="inputcom" placeholder="Enter Your Email" />

          <p>Password</p>
          <input
            onChange={(e) => {
              handleChange(e)
              validate(e.target.value)


            }}

            type="password"
            name="password"
            className="inputcom"
            placeholder="Enter Your Password" />
          {errorMessage === '' ? null :
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorMessage}</span>}

          {/* <p>Confirm Password</p>
          <input type="password" className="inputcom"  placeholder="Confirm Your Password"/> */}

          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}

          <Link className="auth-link" to={"/"}>
            Already have an account
          </Link>
          <p className="contract">
            By registering you agree to Messenger's{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#FFC300",
  "&:hover": {
    backgroundColor: "#FFC300",
  },
}));
