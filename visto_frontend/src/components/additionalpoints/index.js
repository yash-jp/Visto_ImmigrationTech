import React from "react";
import NOCLevel from "./noclevel";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";

function AdditionalPoints(props) {
  {
    console.log(props);
  }
  return (
    <>
      <Row>
        <Col
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <h4>
            Do you have a valid job offer supported by a Labour Market Impact
            Assessment (
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/offer-employment/lmia-exempt.html">
              if needed
            </a>
            )?
          </h4>
          <p>
            A valid job offer must be
            <br />
            - full-time. <br />
            - in a skilled job listed as Skill Type 0, or Skill Level A or B in
            the 2011 National Occupational Classification.
            <br />- for one year from the time you become a permanent resident.
          </p>
          <p>
            A job offer isn’t valid if your employer is:
            <br />
            - an embassy, high commission or consulate in Canada or <br />- on
            the list of ineligible employers.
          </p>
          <p>
            Whether an offer is valid or not also depends on different factors,
            depending on your case. See a{" "}
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/offer-employment.html">
              full list of criteria for valid job offers.
            </a>
          </p>
        </Col>
        {/* Options */}
        <Col
          xl={{ span: 2, offset: 5 }}
          lg={{ span: 2, offset: 5 }}
          md={{ span: 4, offset: 4 }}
          style={{ textAlign: "center" }}
        >
          <select name="" onChange={props.jobofferlmaifn}>
            <option value="select">---SELECT---</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </Col>
      </Row>

      {props.jobofferlmai != "" ? (
        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          isVisible={true}
        >
          <NOCLevel
            noc_level_fn={props.noc_level_fn}
            noc_level={props.noc_level}
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

export default AdditionalPoints;
