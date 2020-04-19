import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Image from "../../images/CanadaImmigration.png";
function LatestBlogPosts() {
  return (
    <>
      <Container>
        <div
          style={{
            textAlign: "center",
            color: "orange",
            marginTop: "30px"
          }}
        >
          <h3>BLOGS</h3>
        </div>
        <Row>
          <Col sm={12} md={6} lg={4} xl={4}>
            <Card>
              <Card.Img variant="top" src={Image} />
              <Card.Body>
                <Card.Title>Blog Title </Card.Title>
                <Card.Text>Blog Description </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className="col-4">Category over here</Col>
                  <Col className="col-4">Author</Col>
                  <Col className="col-4">Date Posted</Col>
                </Row>
                <Row>
                  <h6>Read more ...</h6>
                </Row>
              </Card.Footer>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} xl={4}>
            <Card>
              <Card.Img variant="top" src={Image} />
              <Card.Body>
                <Card.Title>Blog Title </Card.Title>
                <Card.Text>Blog Description </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className="col-4">Category over here</Col>
                  <Col className="col-4">Author</Col>
                  <Col className="col-4">Date Posted</Col>
                </Row>
                <Row>
                  <h6>Read more ...</h6>
                </Row>
              </Card.Footer>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} xl={4}>
            <Card>
              <Card.Img variant="top" src={Image} />
              <Card.Body>
                <Card.Title>Blog Title </Card.Title>
                <Card.Text>Blog Description </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className="col-4">Category over here</Col>
                  <Col className="col-4">Author</Col>
                  <Col className="col-4">Date Posted</Col>
                </Row>
                <Row>
                  <h6>Read more ...</h6>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LatestBlogPosts;
