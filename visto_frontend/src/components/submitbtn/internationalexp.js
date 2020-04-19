import React from "react";
import { Row, Col } from "react-bootstrap";

function Button(props) {
  return (
    <Row>
      <Col
        md={{ span: 4, offset: 4 }}
        sm={{ span: 6, offset: 3 }}
        xs={{ span: 6, offset: 3 }}
        style={{ marginTop: "20px" }}
      >
        <input
          type="submit"
          name="submit"
          value="SUBMIT"
          onClick={props.apiCall}
        ></input>
      </Col>
    </Row>
  );
}

export default Button;
