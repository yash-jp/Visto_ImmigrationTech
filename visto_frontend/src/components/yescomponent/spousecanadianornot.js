import React from "react";
import AgeOfUser from "../agecomponent";
import CLPCmgToCanada from "./commonlawpartnercmgcanada";
import Button from "../submitbtn";
import { Row, Col } from "react-bootstrap";
import { Animated } from "react-animated-css";
function SpouseStatus(props) {
  return (
    <>
      <Row>
        <Col
          md={{ span: 7, offset: 3 }}
          sm={{ offset: 2 }}
          xs={{ offset: 1 }}
          style={{ marginTop: "20px" }}
        >
          Is your spouse or common-law partner a citizen or permanent resident
          of Canada?
        </Col>
      </Row>
      <Col
        md={{ span: 4, offset: 4 }}
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <select onChange={props.citizenfn}>
          <option value="select">-----SELECT----</option>
          <option name="spouse_citizen" value="spouse_citizen_yes">
            Yes
          </option>
          <option name="spouse_citizen" value="spouse_citizen_no">
            No
          </option>
        </select>
      </Col>
      {props.spouse_citizenStateValue !== null
        ? [
            props.spouse_citizenStateValue !== "spouse_citizen_yes" ? (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
                isVisible={true}
              >
                <CLPCmgToCanada
                  submitfn={props.submitfn}
                  submitstatedata={props.submitDatastate}
                  clpartnermainfn={props.clpartnermainfn}
                  clpartnermainstate={props.clpartnermainstate}
                  loe={props.loe}
                  loestate={props.loestate}
                />
              </Animated>
            ) : (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
                isVisible={true}
              >
                <Button
                  apiCall={props.submitfn}
                  stateData={props.submitstatedata}
                ></Button>
              </Animated>
            ),
          ]
        : null}
    </>
  );
}

export default SpouseStatus;
