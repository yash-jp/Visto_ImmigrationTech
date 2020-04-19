import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ModuleCards(props) {
  const percent = 100;
  let style = {
    text: {
      // Text size
      fontSize: "16px",
    },
  };
  return (
    <>
      <Col
        xl={{ span: 2, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        md={{ span: 4, offset: 4 }}
      >
        <Card
          style={{
            backgroundColor: "lightgreen",
          }}
        >
          <Card.Header style={{ textAlign: "center" }}>
            {props.cardTitle}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <CircularProgressbar
                value={percent}
                text={`Complete`}
                styles={style}
              />
            </Card.Title>
            <hr></hr>
            {props.cardText === "Complete" ? (
              <Card.Text style={{ color: "green", textAlign: "center" }}>
                {props.cardText}
              </Card.Text>
            ) : (
              <Card.Text style={{ color: "red", textAlign: "center" }}>
                {props.cardText}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Col>
      <br />
    </>
  );
}

export default ModuleCards;
