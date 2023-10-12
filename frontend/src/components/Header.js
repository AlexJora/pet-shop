import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
const Header = () => {
  //useSelector if you need to select something from the state.
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //We need to destructure the function from useLogoutMutation and then call that function to initiate the logout process.We can call it how we want...logoutApiCall
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // Call the logout API mutation and use .unwrap() to extract the result
      await logoutApiCall().unwrap;
      // Dispatch the logout action to update the user's authentication status
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#F4B07B" }}
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="logo-pet.png"
                alt="pet shop logo"
                width={100}
                height={60}
              />
            </Navbar.Brand>
          </LinkContainer>
          <h6 className="center-text ps-5 fw-bold">
            FREE DELIVERY FOR ORDERS OVER R100!
          </h6>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1"></i>Cart
                  {/* number if items in cart */}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce(
                        (accumulator, current) => accumulator + current.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1"></i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
