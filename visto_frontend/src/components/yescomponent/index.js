import React from "react";
import SpouseStatus from "./spousecanadianornot";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
function YesComponent(props) {
  return (
    <>
      <Row>
        <Col
          md={{ span: 7, offset: 3 }}
          sm={{ offset: 2 }}
          xs={{ offset: 1, span: 10 }}
          style={{ marginTop: "20px" }}
        >
          Are you married or Have Common Law Partner
        </Col>
        <Col
          md={{ span: 5, offset: 4 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <select onChange={props.marriedfn}>
            <option value="select">-----SELECT----</option>
            <option name="married" value="married">
              Married
            </option>
            <option name="commonlawpartner" value="commonlawpartner">
              Common-Law-Partner
            </option>
          </select>
        </Col>
      </Row>

      {props.marriedstate != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <SpouseStatus
            citizenfn={props.citizenfn}
            spouse_citizenStateValue={props.spouse_citizenStateValue}
            submitfn={props.submitfn}
            submitstatedata={props.submitDatastate}
            clpartnermainfn={props.clpcmgtocanada}
            clpartnermainstate={props.clpcmgtocanadastate}
            loe={props.loe}
            loestate={props.loestate}
          />
        </Animated>
      ) : null}
    </>
  );
}

export default YesComponent;
