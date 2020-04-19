import React from "react";
import Button from "../submitbtn";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
function NoComponent(props) {
  return (
    <>
      <Row>
        <Col md={{ span: 5, offset: 4 }} style={{ marginTop: "20px" }}>
          <h3>Please select your status</h3>
        </Col>

        <Col
          md={{ span: 4, offset: 4 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <select onChange={props.notmarriedfn}>
            <option name="select" value="select">
              ---SELECT---
            </option>
            <option name="notMarried" value="Annulled Marriage">
              Annuled Marriage
            </option>
            <option name="notMarried" value="divorced">
              Divorced
            </option>
            <option name="notMarried" value="legally seperated">
              Legally Seperated
            </option>
            <option name="notMarried" value="never married">
              Never Mind
            </option>
            <option name="notMarried" value="widowed">
              Widowed
            </option>
          </select>
        </Col>
      </Row>
      {props.notmarriedvalue != ""
        ? [
            props.notmarriedvalue === "select" ? null : (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
                isVisible={true}
              >
                <Button apiCall={props.submitfn} />
              </Animated>
            ),
          ]
        : null}
    </>
  );
}

export default NoComponent;
