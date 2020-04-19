import React from "react";
import NominationCertificate from "./nominationcerificate";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
function NOCLevel(props) {
  {
    console.log(props);
  }
  return (
    <>
      {/* FIXME BackgroundColor */}
      <Row>
        <Col
          xl={{ span: 6, offset: 3 }}
          lg={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <p>
            Which NOC skill type or level is the job offer? You can use our
            online tool to find out if you don’t know.
          </p>
        </Col>
        <Col
          xl={{ span: 2, offset: 3 }}
          lg={{ span: 2, offset: 5 }}
          md={{ span: 4, offset: 4 }}
          style={{ textAlign: "center" }}
        >
          <select name="noclevel" onChange={props.noc_level_fn}>
            <option value="select">---SELECT---</option>
            <option value="NOC SKill Type 00">NOC Skill Type 00</option>
            <option value="NOC Skill Type A or B or Any Type 0 other than 00">
              NOC Skill Level A or B or any Type 0 other than 00
            </option>
            <option value="2">NOC Skill Level C or D</option>
          </select>
        </Col>
      </Row>
      {props.noc_level != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <NominationCertificate
            nominationcertificatefn={props.nominationcertificatefn}
            nominationcertificatestate={props.nominationcertificatestate}
            siblingsincanadafn={props.siblingsincanadafn}
            siblingsincanadastate={props.siblingsincanadastate}
            apiCall={props.apiCall}
          />
        </Animated>
      ) : null}
    </>
  );
}

export default NOCLevel;
