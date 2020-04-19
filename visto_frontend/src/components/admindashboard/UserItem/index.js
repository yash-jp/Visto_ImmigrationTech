import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

function UserItem(props) {
  return (
    <>
      {console.log(props)}
      <div style={{ width: "60%", margin: "20px auto" }}>
        <Row>
          <Col style={{ backgroundColor: "red", textAlign: "center" }}>
            {/* {props[props.index].user.country} */}
          </Col>
          <Col style={{ backgroundColor: "yellow", textAlign: "center" }}>
            {/* {props[props.index].user.first_name} */}
          </Col>
          <Col style={{ backgroundColor: "blue", textAlign: "center" }}>
            {/* {props[props.index].user.email} */}
          </Col>
        </Row>
        <Row>
          <Col style={{ backgroundColor: "green", textAlign: "center" }}>
            <Row>
              <Col>Module 1</Col>
            </Row>
            <Row>
              {/* <Col>{props[props.index].user.email}</Col> */}
              {/* <Col>{props[props.index].score.section_a}</Col> */}
            </Row>
          </Col>
          <Col style={{ backgroundColor: "pink", textAlign: "center" }}>
            <Row>
              <Col>Module 2</Col>
            </Row>
            <Row>{/* <Col>{props[props.index].score.section_b}</Col> */}</Row>
          </Col>
          <Col style={{ backgroundColor: "violet", textAlign: "center" }}>
            <Row>
              <Col>Module 3</Col>
            </Row>
            <Row>{/* <Col>{props[props.index].score.section_c}</Col> */}</Row>
          </Col>
          <Col style={{ backgroundColor: "purple", textAlign: "center" }}>
            <Row>
              <Col>Module 4</Col>
            </Row>
            <Row>{/* <Col>{props[props.index].score.section_d}</Col> */}</Row>
          </Col>
          <Col style={{ backgroundColor: "magenta", textAlign: "center" }}>
            <Row>
              <Col>Grand Total</Col>
            </Row>
            <Row>{/* <Col>{props[props.index].score.crs_score}</Col> */}</Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              type="button"
              class="btn btn-info"
              style={{ textAlign: "right" }}
            >
              Info
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserItem;
