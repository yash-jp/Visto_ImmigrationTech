import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <>
      <div id="footer">
        <Row style={{ backgroundColor: "#0D3C4D" }}>
          <Col xl={4} lg={4} md={4} sm={12}>
            <Col className="footer_contact">Visto Tech</Col>
            <Col className="footer_contact">Located In Toronto</Col>
            <Col className="footer_contact">
              <img
                src="https://visto.ai/wp-content/uploads/2019/10/icon_light.png"
                style={{ height: "50px" }}
              />
            </Col>
          </Col>
          <Col xl={4} lg={4} md={4} style={{ marginTop: "25px" }}>
            <Col className="footer_contact">Follow Us On</Col>
            <Col className="footer_contact">
              <SocialIcon
                network="facebook"
                style={{ height: 25, width: 25 }}
              />
              <SocialIcon
                network="twitter"
                style={{ height: 25, width: 25, marginLeft: "10px" }}
              />
              <SocialIcon
                network="linkedin"
                style={{ height: 25, width: 25, marginLeft: "10px" }}
              />
            </Col>
          </Col>
          <Col style={{ paddingTop: "10px" }} xl={4} lg={4} md={4}>
            <Col className="footer_contact">Contact Us </Col>
            <Col className="footer_contact">Email :- vistoai@gmail.com</Col>
            <Col className="footer_contact">Contact :- 4573883727</Col>
            <Col className="footer_contact">linkedln.com/vistoai2343</Col>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "#000000 " }}>
          <Col className="footer_contact">&copy;Copyright Visto.ai 2020</Col>
        </Row>
      </div>
    </>
  );
}

export default Footer;
