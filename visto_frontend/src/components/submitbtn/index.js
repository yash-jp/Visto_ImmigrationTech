import React from "react";
import { Row, Col } from "react-bootstrap";
function Button(props) {
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }} style={{ marginTop: "20px" }}>
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
