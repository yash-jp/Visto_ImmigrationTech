import React from "react";
import Siblings from "./siblings";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
function NominationCertificate(props) {
  return (
    <>
      <Row>
        <Col
          xl={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <p>
            9) Do you have a nomination certificate from a province or
            territory?
          </p>
        </Col>
        <Col
          xl={{ span: 2, offset: 5 }}
          lg={{ span: 2, offset: 5 }}
          md={{ span: 4, offset: 4 }}
          style={{ textAlign: "center" }}
        >
          <select
            name="nominationcertificate"
            onChange={props.nominationcertificatefn}
          >
            <option value="select">---SELECT---</option>
            <option value="provincial_nomination_yes">YES</option>
            <option value="provincial_nomination_no"> NO</option>
          </select>
        </Col>
      </Row>
      {props.nominationcertificatestate != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <Siblings
            apiCall={props.apiCall}
            siblingsincanadafn={props.siblingsincanadafn}
            siblingsincanadastate={props.siblingsincanadastate}
          />
        </Animated>
      ) : null}
    </>
  );
}

export default NominationCertificate;
