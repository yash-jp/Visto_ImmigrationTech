import React from "react";
import Button from "../submitbtn/index";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";

function LevelOfEducation(props) {
  return (
    <>
      <Row>
        <Col
          md={{ span: 6, offset: 3 }}
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Choose the best answer to describe the level of your education
        </Col>
        <Col
          md={{ offset: 1, span: 5 }}
          lg={{ offset: 3, span: 6 }}
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <select
            style={{ width: "200px" }}
            onChange={props.canadianlevelofedufn}
          >
            <option name="select" value="select">
              ---SELECT---
            </option>
            <option name="school" value="secondary">
              None or Secondary (high school) or less
            </option>
            <option name="school" value="one_or_two">
              One- or two-year diploma or certificate
            </option>
            <option name="school" value="three_or_more_or_masters">
              Degree, diploma or certificate of three years or longer OR a
              Master’s, professional or doctoral degree of at least one academic
              year
            </option>
          </select>
        </Col>
      </Row>

      {
        props.canadianlevelofedu != "" ? (
          <Animated
            animationIn="fadeIn"
            animationInDuration={1000}
            isVisible={true}
          >
            <Button apiCall={props.submitData} />
          </Animated>
        ) : null
        // <Button apiCall={props.submitData} />
      }
    </>
  );
}

export default LevelOfEducation;
