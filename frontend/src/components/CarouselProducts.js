import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const CarouselProducts = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) {
    // Return null during loading state
    return null;
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-white mb-4 custom-carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="carousel-img d-block mx-auto"
            />
            <Carousel.Caption className="carousel-caption">
              <h4>
                {product.name} (R{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselProducts;
