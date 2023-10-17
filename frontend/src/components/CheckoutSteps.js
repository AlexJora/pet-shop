import React from "react";
import { Nav, NavLink, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav>
        <Nav.Item className="">
          {step1 ? (
            <LinkContainer to="login">
              <NavLink className="rounded-circle border text-xs">
                Sign In
              </NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Sign In</NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping">
              <NavLink className="rounded-circle border text-xs">
                Shipping
              </NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>Shipping</NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <NavLink className="rounded-circle border text-xs">
                Payment
              </NavLink>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder">
              <NavLink className="rounded-circle border text-xs">
                Place Order
              </NavLink>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutSteps;
