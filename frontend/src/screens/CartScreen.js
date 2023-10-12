import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Select the 'cart' state from Redux store
  const cart = useSelector((state) => state.cart);
  // Destructure the 'cartItems' from 'cart' state
  const { cartItems } = cart;
  //===handler for adding items in cart
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  //===handler for removing items from cart
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  //===checkout
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup key={item._id}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>R{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="py-5">
        <Card>
          <ListGroup.Item variant="flash" className="p-3">
            <h6>
              Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h6>
            R
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
