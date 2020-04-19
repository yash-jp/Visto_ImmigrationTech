import React from "react";
import LoadScoreModule from "../ielts/loadscoremodules";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";

function SpouseIELTS(props) {
  console.log(props);
  return (
    <>
      <Row>
        <Col
          md={{ span: 8, offset: 2 }}
          sm={{ offset: 2 }}
          xs={{ offset: 1 }}
          style={{ marginTop: "3vh" }}
        >
          <h5>
            Did your spouse or common-law partner take a language test(IELTS)?
            If so, is the test less than two years old.
          </h5>
        </Col>
      </Row>
      <Animated
        animationIn="fadeIn"
        animationInDuration={1000}
        isVisible={true}
      >
        <LoadScoreModule {...props} />
      </Animated>
    </>
  );
}

export default SpouseIELTS;
