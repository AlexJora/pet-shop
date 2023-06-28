import React from "react";
import { useState, useEffect } from "react";
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

  const [login, { isLoading }] = useLoginMutation();
  //useSelector to bring user ifo, witch is part of auth state
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
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
