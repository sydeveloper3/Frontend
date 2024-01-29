import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import {auth, provider} from '../utils/configure';
import { signInWithPopup } from 'firebase/auth';

function Register() {
  const [gvalue, setGvalue] = useState({username: "",email: "",password: "123456",});
//   const handleClick=async()=>{
//     try{
//         const result=await signInWithPopup(auth,provider)
//         console.log(result);
//         setGvalue({username:result.user.displayName,email:result.user.email});
//         console.log(gvalue,'gvaluedd')
//     }catch(err){
//         console.log("Cant login with google",err);
//     }
// }
  // useEffect(()=>{
  //     setGvalue(localStorage.getItem("chat-app-user"));
  // })
      
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/setAvatar");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/login");
      }
    }
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("UserName Must be greater", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Passowrd should Be greater than 6 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer className="form">
        <form
          className="mainForm"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img className="regImg" src={Logo} alt="Logo" />
            <h1>Chit Chat</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="UserName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          {/* {gvalue ? <SetAvatar/> : ""} */}
          {/* <button onClick={handleClick} className="text-bold text-white"> Log in with Google </button> */}
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div``;

export default Register;
