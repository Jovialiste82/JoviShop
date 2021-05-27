import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  // modified due to Redux implementation
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  ///////////////////////////////////////////////////////////
  ///// useEffect modified due to Redux implementation //////
  ///////////////////////////////////////////////////////////
  // useEffect(() => {
  //   // we can't make outer cb async so we create a function
  //   // and we make that function async
  //   const fetchProducts = async () => {
  //     // const res = await axios.get('/api/products')
  //     // But we can destructure
  //     const { data } = await axios.get("/api/products");
  //     // http://127.0.0.1 is my loopback address
  //     // AKA localhost
  //     // used to setup proxy in package.json
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
