import React from "react";
import AdditionalPoints from "./additionalpoints";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
const AgeOfUser = (props) => {
  return (
    <>
      <Row>
        <Col
          xl={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <h3>Choose your age</h3>
          <h5>Choose the best answer possible </h5>
          If you’ve been invited to apply, enter your age on the date you were
          invited.
          <p>OR</p>
          If you plan to complete an Express Entry profile, enter your current
          age.
        </Col>
        <Col
          xl={{ span: 2, offset: 5 }}
          lg={{ span: 2, offset: 5 }}
          md={{ span: 4, offset: 4 }}
          style={{ textAlign: "center" }}
        >
          <select onChange={props.agefn}>
            <option name="select" value="select">
              ------SELECT------
            </option>
            <option name="age" value="25">
              25 years old
            </option>
            <option name="age" value="26">
              26 years old
            </option>
            <option name="age" value="27">
              27 years old
            </option>
            <option name="age" value="28">
              28 years old
            </option>
            <option name="age" value="29">
              29 years old
            </option>
            <option name="age" value="30">
              30 years old
            </option>
            <option name="age" value="31">
              31 years old
            </option>
            <option name="age" value="32">
              32 years old
            </option>
            <option name="age" value="33">
              33 years old
            </option>
          </select>
        </Col>
      </Row>

      {props.agestate != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <AdditionalPoints
            jobofferlmaifn={props.jobofferlmaifn}
            jobofferlmai={props.jobofferlmai}
            nominationcertificatefn={props.nominationcertificatefn}
            nominationcertificatestate={props.nominationcertificate}
            siblingsincanadafn={props.siblingsincanadafn}
            siblingsincanadastate={props.siblingsincanadastate}
            noc_level={props.noc_level}
            noc_level_fn={props.noc_level_fn}
            apiCall={props.apiCall}
          />
        </Animated>
      ) : null}
    </>
  );
};

export default AgeOfUser;
