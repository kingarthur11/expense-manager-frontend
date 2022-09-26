import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
// import { LoginLeftView } from './loginLeftView'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux'

import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";

const Login = () => {
  //   const dispatch = useDispatch()
  //   const navigate = useNavigate()

  const data = {
    email: "",
    password: "",
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setError] = useState(false);
  const [formData, setformData] = useState(data);

  const togglePassword1 = () => {
    setPasswordShown(!passwordShown);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const { email, password } = formData;
    if (!isValidEmail(email)) {
      return setError(true);
    }
    let data = {
      email,
      password,
    };
    // dispatch(loginUser(data, navigate))
  };
  // useEffect(() => {
  //   if (users && users.kyc && users.role === "COMPANY") {
  //     navigate("/company-profile");
  //   } else if (users && users.kyc && users.role === "INDIVIDUAL_USER") {
  //     navigate("/personal-profile");
  //   } else if (isLoggedIn || users) {
  //     if (
  //       (login && login.role && login.role.name === "COMPANY") ||
  //       (users && users.role === "COMPANY")
  //     ) {
  //       navigate("/kyc/company");
  //     } else if (
  //       (login && login.role && login.role.name === "INDIVIDUAL_USER") ||
  //       (users && users.role === "INDIVIDUAL_USER")
  //     ) {
  //       navigate("/kyc/person");
  //     }
  //   }
  // }, [isLoggedIn, users]);

  return (
    <WrapperContainer>
      <Wrapper>
        <div className="form-side">
          <div>
            <h3>Login</h3>
            <div className="mt-4">
              <div className="my-3">
                <div className="">
                  <label>Email</label>
                  <input
                    name="email"
                    // value={values.email}
                    defaultValue="myemail@gmail.com"
                    className="w-100 dollar-input"
                    placeholder="Email Address"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-3">
                <div className="">
                  <label>Password</label>
                  <input
                    name="password"
                    // value={values.password}
                    defaultValue="password"
                    className="w-100 dollar-input"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="px-4 py-2">
                <Link className="style-link" to={`/`}>
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </WrapperContainer>
  );
};

export default Login;

const WrapperContainer = styled.div`
  background: #103783;
`;
const Wrapper = styled.div`
  height: 100vh;
  padding: 100px 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-side {
  }
  input {
    color: #000000;
  }
  label,
  h3 {
    color: #ffffff;
    font-style: normal;
    line-height: 40px;
  }
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
  }
  label,
  input {
    font-weight: 500;
    font-size: 15px;
  }
  button {
    background: #0037ba;
    border-radius: 5px;
    color: #ffffff;
  }
  .style-link {
    text-decoration: none;
    color: #ffffff;
  }
`;
