import React from "react";
import SpouseIELTS from "./spouseielts";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";

function SpouseWorkExp(props) {
  return (
    <>
      <Row>
        <Col
          md={{ span: 8, offset: 2 }}
          sm={{ offset: 2 }}
          xs={{ offset: 1 }}
          style={{ marginTop: "4vh" }}
        >
          {/* FIXME Change Font Size */}
          <h5>
            12) In the last ten years, how many years of skilled work experience
            in Canada does your spouse/common-law partner have? It must have
            been paid, full-time (or an equal amount in part-time), and in one
            or more NOC 0, A or B jobs.
          </h5>
        </Col>
        <Col
          md={{ span: 8, offset: 2 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <select
            style={{ width: "450px" }}
            name="spouseworkexperienceoptions"
            onChange={props.spouseworkexperiencefn}
          >
            <option value="select">---SELECT---</option>
            <option value="none or less than a year">
              None or less than a year
            </option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
            <option value="5 years or more">5 years or more</option>
          </select>
        </Col>
      </Row>
      {props.spouseworkexperiencestate != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <SpouseIELTS {...props} />
        </Animated>
      ) : null}
    </>
  );
}

export default SpouseWorkExp;
