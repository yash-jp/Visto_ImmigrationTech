import React from "react";
import Button from "../submitbtn";
import { Row, Col } from "react-bootstrap";
import { Animated } from "react-animated-css";
function CLPCmgToCanada(props) {
  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} style={{ marginTop: "20px" }}>
          {/* FIXME change text size */}
          <h3>Please select your status</h3>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 7, offset: 3 }} style={{ marginTop: "20px" }}>
          Will your spouse or common-law partner come with you to Canada?{" "}
        </Col>
        <Col
          md={{ span: 4, offset: 4 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <select onChange={props.clpartnermainfn}>
            <option name="select" value="select">
              ---SELECT---
            </option>
            <option
              name="spouse_coming_canada"
              value="spouse_coming_canada_yes"
            >
              YES
            </option>
            <option name="spouse_coming_canada" value="spouse_coming_canada_no">
              NO
            </option>
          </select>
        </Col>
      </Row>

      {props.clpartnermainstate != null ? (
        <Animated
          animationIn="fadeIn "
          animationInDuration={1000}
          isVisible={true}
        >
          <Button
            apiCall={props.submitfn}
            stateData={props.submitstatedata}
            propdata={props}
          />
        </Animated>
      ) : null}
    </>
  );
}

export default CLPCmgToCanada;
