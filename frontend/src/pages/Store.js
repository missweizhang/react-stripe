import { Col, Row } from "react-bootstrap";
import { productsArray } from "../productsStore";
import ProductCard from "../component/ProductCard";

const Store = () => {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the Store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product) => (
          <Col align="center" key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
