import { margin } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { Line } from "../components/Categories/Categories";
import { mobile } from "../Responsive";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../RequestMethods";
import { loginFailed } from "../ReduxStore/userSlice";
import { useDispatch } from "react-redux";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  /* margin-top: -70px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  ${mobile({ width: "300px" })}
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: 400;
  margin: 10px 10px;
`;
const Input = styled.input`
  width: 40%;
  padding: 10px;
  margin: 10px;
  outline: none;
  font-size: 15px;
  ${mobile({ width: "280px" })}
`;
const Agreement = styled.span`
  margin: 10px;
  line-height: 20px;
  letter-spacing: 0.2pt;
  text-align: center;
`;
const Button = styled.button`
  background-color: teal;
  color: #fff;
  border: none;
  outline: none;
  padding: 10px;
  width: 90%;
  font-size: 20px;
  margin: 10px;
  cursor: pointer;
`;
const initialState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  mobile: "",
};
const Register = () => {
  const [userData, setUserData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [click, setClick] = useState(false);
  const [errors, setError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  // useEffect(() => {
  const register = async () => {
 
    console.log("hello");
    if (
      userData.fullname != "" &&
      userData.email != "" &&
      userData.mobile != "" &&
      userData.password != "" &&
      userData.username != ""
    ) {
      try {

        console.log("in function");
        const res = await publicRequest.post("auth/register", userData);
        console.log(res.data);
        setMessage("Regiatration Successful, Please Login!");
        setError(false);
        setClick(true);
      } catch (error) {
        console.log(error);
        setMessage("Something went wrong!");
        setError(true);
      }
    } else setMessage("Please fill all the details!");
  };

  // register();
  // else {
  //   setError(true);
  //   console.log(errors);
  // }
  // }, [click]);
  return (
    <>
      <Navbar />
      <Container
        bg={
          "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEZhc2hpb258ZW58MHwwfDB8fHww&auto=format&fit=crop&w=600&q=60"
        }
      >
        <Wrapper>
          <Title>Register</Title>
          <Line />
          {errors && click && (
            <p style={{ color: "red" }}>{message}</p>
          )}
          {!errors && click && (
            <p style={{ color: "green" }}>{message}</p>
          )}
          <Form>
            <Input
              placeholder="Full Name"
              name="fullname"
              type="text"
              onChange={handleChange}
            />
            <Input
              placeholder="UserName"
              name="username"
              type="text"
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
            />
            <Input
              placeholder="Mobile no."
              name="mobile"
              type="number"
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Form>
          <Agreement>
            {"By registering you accept all our terms and Conditions and".toUpperCase()}{" "}
            <b style={{ margin: "10px" }}>{"Privacy Policy".toUpperCase()}</b>
          </Agreement>
          <Button onClick={register}>SIGN IN</Button>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
