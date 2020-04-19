import React from "react";
import Button from "../submitbtn/index";
import { Animated } from "react-animated-css";
import { Row, Col } from "react-bootstrap";
function LoadScoreModule(props) {
  return (
    <>
      <Row>
        <Col
          md={{ span: 8, offset: 2 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <h5>Speaking</h5>
          <select name="speaking" onChange={props.speakingfn}>
            <option value="select">---SELECT---</option>
            <option value="9.0">9.0</option>
            <option value="8.5">8.5</option>
            <option value="8.0">8.0</option>
            <option value="7.5">7.5</option>
            <option value="7.0">7.0</option>
            <option value="6.5">6.5</option>
            <option value="6.0">6.0</option>
            <option value="5.5">5.5</option>
            <option value="5.0">5.0</option>
            <option value="4.5">4.5</option>
            <option value="4.0">4.0</option>
            <option value="3.5">3.5</option>
            <option value="3.0">3.0</option>
            <option value="2.5">2.5</option>
            <option value="2.0">2.0</option>
            <option value="1.5">1.5</option>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
            <option value="0">0</option>
          </select>
          {/*  */}
          <h5>Listening</h5>
          <select name="listening" onChange={props.listeningfn}>
            <option value="select">---SELECT---</option>
            <option value="9.0">9.0</option>
            <option value="8.5">8.5</option>
            <option value="8.0">8.0</option>
            <option value="7.5">7.5</option>
            <option value="7.0">7.0</option>
            <option value="6.5">6.5</option>
            <option value="6.0">6.0</option>
            <option value="5.5">5.5</option>
            <option value="5.0">5.0</option>
            <option value="4.5">4.5</option>
            <option value="4.0">4.0</option>
            <option value="3.5">3.5</option>
            <option value="3.0">3.0</option>
            <option value="2.5">2.5</option>
            <option value="2.0">2.0</option>
            <option value="1.5">1.5</option>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
            <option value="0">0</option>
          </select>

          {/* */}
          <h5>Reading</h5>
          <select name="reading" onChange={props.readingfn}>
            <option value="select">---SELECT---</option>
            <option value="9.0">9.0</option>
            <option value="8.5">8.5</option>
            <option value="8.0">8.0</option>
            <option value="7.5">7.5</option>
            <option value="7.0">7.0</option>
            <option value="6.5">6.5</option>
            <option value="6.0">6.0</option>
            <option value="5.5">5.5</option>
            <option value="5.0">5.0</option>
            <option value="4.5">4.5</option>
            <option value="4.0">4.0</option>
            <option value="3.5">3.5</option>
            <option value="3.0">3.0</option>
            <option value="2.5">2.5</option>
            <option value="2.0">2.0</option>
            <option value="1.5">1.5</option>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
            <option value="0">0</option>
          </select>

          {/*  */}
          <h5>Writing</h5>
          <select name="writing" onChange={props.writingfn}>
            <option value="select">---SELECT---</option>
            <option value="9.0">9.0</option>
            <option value="8.5">8.5</option>
            <option value="8.0">8.0</option>
            <option value="7.5">7.5</option>
            <option value="7.0">7.0</option>
            <option value="6.5">6.5</option>
            <option value="6.0">6.0</option>
            <option value="5.5">5.5</option>
            <option value="5.0">5.0</option>
            <option value="4.5">4.5</option>
            <option value="4.0">4.0</option>
            <option value="3.5">3.5</option>
            <option value="3.0">3.0</option>
            <option value="2.5">2.5</option>
            <option value="2.0">2.0</option>
            <option value="1.5">1.5</option>
            <option value="1.0">1.0</option>
            <option value="0.5">0.5</option>
            <option value="0">0</option>
          </select>
        </Col>
      </Row>

      {props.listeningState != "" &&
      props.readingState != "" &&
      props.speakingState != "" &&
      props.writingState != "" ? (
        <Animated
          animationIn="fadeIn"
          animationOut="zoomOutDown"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={true}
        >
          <Button apiCall={props.submitfn} />
        </Animated>
      ) : null}
    </>
  );
}

export default LoadScoreModule;
