import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
// CSSs
import "./contactItem.css";
import { Container } from "react-bootstrap";

const ContactItem = (props) => {
  return (
    <>
      <div
        style={{
          width: "60%",
          backgroundColor: "#b2ebf2",
          boxShadow: "1px 1px black",
          color: "#511845",
          fontWeight: "bold",
          margin: "20px auto",
        }}
        id="div"
      >
        <Row style={{ borderBottom: "1.5px solid white" }}>
          <Col
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "7px",
            }}
            lg={{ span: 3 }}
          >
            Country
          </Col>
          <Col
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "7px",
            }}
          >
            Name
          </Col>
          <Col
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "7px",
            }}
          >
            Email
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              marginTop: "15px ",
              marginBottom: "15px",
              textAlign: "center",
              borderRight: "1px solid black",
            }}
          >
            {props.country}
          </Col>
          <Col
            style={{
              marginTop: "15px ",
              marginBottom: "15px",
              textAlign: "center",
              borderRight: "1px solid black",
            }}
          >
            {props.name}
          </Col>
          <Col
            style={{
              marginTop: "15px ",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {props.email}
          </Col>
        </Row>
        {props.crs_score != null ? (
          <>
            <Row
              style={{
                borderBottom: "1.5px solid white",
                borderTop: "1px solid black",
              }}
            >
              <Col
                style={{
                  marginTop: "15px ",
                  marginBottom: "15px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Row>
                  <Col>Module 1</Col>
                </Row>
                <Row>
                  <Col style={{ borderTop: "1px solid black" }}>
                    {props.crs_score.section_a}
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  marginTop: "15px ",
                  marginBottom: "15px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Row>
                  <Col>Module 2</Col>
                </Row>
                <Row>
                  <Col style={{ borderTop: "1px solid black" }}>
                    {props.crs_score.section_b}
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  marginTop: "15px ",
                  marginBottom: "15px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Row>
                  <Col>Module 3</Col>
                </Row>
                <Row>
                  <Col style={{ borderTop: "1px solid black" }}>
                    {props.crs_score.section_c}
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  marginTop: "15px ",
                  marginBottom: "15px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <Row>
                  <Col>Module 4</Col>
                </Row>
                <Row>
                  <Col style={{ borderTop: "1px solid black" }}>
                    {props.crs_score.section_d}
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  marginTop: "15px ",
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                <Row>
                  <Col>Grand Total</Col>
                </Row>
                <Row>
                  <Col style={{ borderTop: "1px solid black" }}>
                    {props.crs_score.crs_score}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Col>
              <button
                type="button"
                class="btn btn-info"
                style={{ textAlign: "right" }}
                id={props.id}
                onClick={props.handlebuttonclick}
              >
                Info
              </button>
            </Col>
            <Row></Row>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ContactItem;
