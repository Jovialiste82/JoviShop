import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // we can't make outer cb async so we create a function
    // and we make that function async
    const fetchProducts = async () => {
      // const res = await axios.get('/api/products')
      // But we can destructure
      const { data } = await axios.get("/api/products");
      // http://127.0.0.1 is my loopback address
      // AKA localhost
      // used to setup proxy in package.json
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
