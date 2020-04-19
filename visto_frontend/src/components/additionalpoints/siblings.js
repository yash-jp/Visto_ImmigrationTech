import React from "react";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
import Button from "../submitbtn";
function Siblings(props) {
  return (
    <>
      <Row>
        <Col
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
          style={{ marginTop: "5vh", textAlign: "center" }}
        >
          <p>
            {" "}
            10) Do you or your spouse or common law partner (if they will come
            with you to Canada) have at least one brother or sister living in
            Canada who is a citizen or permanent resident?
          </p>
          <p>
            Note: to answer yes, the brother or sister must be:
            <br />
            - 18 years old or older <br />
            - related to you or your partner by blood, marriage, common-law
            partnership or adoption <br />
            - have a parent in common with you or your partner <br />
          </p>
          <p>
            A brother or sister is related to you by:
            <br />
            - blood (biological)
            <br /> - adoption <br />- marriage (step-brother or step-sister)
          </p>
        </Col>
        <Col
          xl={{ span: 2, offset: 5 }}
          lg={{ span: 2, offset: 5 }}
          md={{ span: 4, offset: 4 }}
          style={{ textAlign: "center" }}
        >
          <select name="" onChange={props.siblingsincanadafn}>
            <option value="select">---SELECT---</option>
            <option value="immediate_relative_yes">YES</option>
            <option value="immediate_relative_no">NO</option>
          </select>
        </Col>
      </Row>
      <Animated
        animationIn="fadeIn"
        animationInDuration={1000}
        isVisible={true}
      >
        <Col md={{ span: 8, offset: 2 }} style={{ marginTop: "20px" }}>
          {/* <button
            disabled={!props.siblingsincanadastate}
            onClick={props.apiCall}
          >
            Submit
          </button> */}
          <Button
            siblingsincanadastate={props.siblingsincanadastate}
            apiCall={props.apiCall}
          />
        </Col>
      </Animated>
    </>
  );
}

export default Siblings;
