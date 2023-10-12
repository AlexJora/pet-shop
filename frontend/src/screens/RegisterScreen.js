import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Get access to the Redux dispatch function and the navigation function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Use the useRegisterMutation hook to handle user registration
  const [register, { isLoading }] = useRegisterMutation();
  //useSelector to bring user info, witch is part of auth state
  const { userInfo } = useSelector((state) => state.auth);
  // Get the redirect path from the URL, or default to "/"
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  // useEffect to automatically navigate to the redirect path if the user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Check if the entered password and confirmation password match
      toast.error("Password do not match");
      return;
    } else {
      try {
        // Attempt to register the user using the register mutation and unwrap the response
        const res = await register({ name, email, password }).unwrap();
        console.log(res);
        // Dispatch an action to set the user's credentials in the Redux store
        dispatch(setCredentials({ ...res }));
        // Redirect the user to the specified redirect path
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name" className="my-3">
          <FormLabel>Name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="email" className="my-3">
          <FormLabel>Email Address</FormLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="password" className="my-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirmPassword" className="my-3">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            Already have am account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
