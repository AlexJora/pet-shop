import React from "react";
import { useState, useEffect } from "react";
//useDispatch is used to dispatch actions such as the login in that slice and the set credentials
//useSelector is to get things from the state such as the user.
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Use the useLoginMutation hook from an API slice to handle login
  const [login, { isLoading }] = useLoginMutation();
  //Use the useSelector to access the user information from the Redux store
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
    try {
      // Attempt to login using the login mutation and unwrap the response
      const res = await login({ email, password }).unwrap();
      // Dispatch an action to set the user credentials in the Redux store
      dispatch(setCredentials({ ...res }));
      // Navigate to the specified redirect path
      navigate(redirect);
    } catch (err) {
      // Display an error message using the toast notification
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <FormLabel>Email Address</FormLabel>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
