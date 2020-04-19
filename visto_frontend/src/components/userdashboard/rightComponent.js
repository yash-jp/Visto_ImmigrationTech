import React from "react";
import ModuleCards from "./modules";
import { Container, Row, Col } from "react-bootstrap";
import { easeQuadInOut } from "d3-ease";
import { Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import AnimatedProgressProvider from "./animatedProvider";
import Footer from "../../components/footer";
import Header from "../header";

class RightComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let usertoken = sessionStorage.getItem("token");
    fetch("https://capestone-visto-server.herokuapp.com/api/check-score", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }
  render() {
    return (
      <>
        <Header />
        <Container style={{ backgroundColor: "grey" }}>
          <span style={{ height: "10px" }}></span>
          <div
            style={{
              marginLeft: "auto",
              boxShadow: "1px solid black",
              width: "90%",
              backgroundColor: "white",
            }}
          >
            <Row>
              <Col
                style={{
                  marginTop: "15px",
                  fontSize: "25px",
                  fontFamily: "Times New Roman, Times, serif",
                  color: "black",
                  borderBottom: "1px solid black",
                }}
                xl={{ offset: "0" }}
              >
                User DashBoard
              </Col>
            </Row>
            {this.state.data !== undefined ? (
              <>
                {console.log(this.state.data)}
                {/* Row 1 */}
                <Row>
                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link to="/cadeduupdate" style={{ textDecoration: "none" }}>
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[0].header} */}
                          Canadian Education
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                (this.state.data.subtotal[3][
                                  "Study in Canada"
                                ] *
                                  100) /
                                30
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            {this.state.data.subtotal[3]["Study in Canada"]} /
                            30
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  <hr></hr>
                  {/* ***********Card 2 ******************/}
                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link
                      to="/cadforeigneduupdate"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[1].header} */}
                          Foreign Education
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                (this.state.data.subtotal[0][
                                  "Level of Education"
                                ] *
                                  100) /
                                150
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{ color: "green", textAlign: "center" }}
                          >
                            {this.state.data.subtotal[0]["Level of Education"]}{" "}
                            / 150
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  <hr></hr>

                  {/* ***********Card 3 ******************/}

                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link
                      to="/updateforeignworkexp"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[2].header} */}
                          Foreign Work Experience
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                (this.state.data.subtotal[2][
                                  "Foreign work experience"
                                ] *
                                  100) /
                                50
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{ color: "green", textAlign: "center" }}
                          >
                            {
                              this.state.data.subtotal[2][
                                "Foreign work experience"
                              ]
                            }{" "}
                            / 50
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </Row>
                {/* ********************************************************************************** */}
                {/* Row 2 */}

                <Row>
                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link
                      to="/updatecadworkexp"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[0].header} */}
                          Canadian Work Experience
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                (this.state.data.subtotal[0][
                                  "Canadian work experience"
                                ] *
                                  100) /
                                80
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            {
                              this.state.data.subtotal[0][
                                "Canadian work experience"
                              ]
                            }{" "}
                            / 80
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  <hr></hr>
                  {/* ***********Card 2 ******************/}
                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link
                      to="/updatelanguage"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[1].header} */}
                          Official Language
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                (this.state.data.subtotal[0][
                                  "Official languages proficiency"
                                ] *
                                  100) /
                                136
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{ color: "green", textAlign: "center" }}
                          >
                            {
                              this.state.data.subtotal[0][
                                "Official languages proficiency"
                              ]
                            }{" "}
                            / 136
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  <hr></hr>

                  {/* ***********Card 3 ******************/}
                  <Col
                    // className="infoCards"
                    xl={{ span: 3, offset: 1 }}
                    lg={{ span: 3, offset: 1 }}
                    md={{ span: 4, offset: 0 }}
                  >
                    <Link
                      to="/updateadditional"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Card.Header style={{ textAlign: "center" }}>
                          {/* {this.state.data[2].header} */}
                          Additional Points
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={
                                ((this.state.data.subtotal[0].Age +
                                  this.state.data.subtotal[2][
                                    "Certificate of qualification"
                                  ] +
                                  this.state.data.subtotal[3][
                                    "Provincial nomination"
                                  ] +
                                  this.state.data.subtotal[3]["Job offer"] +
                                  this.state.data.subtotal[3][
                                    "Sibling in Canada"
                                  ]) *
                                  100) /
                                975
                              }
                              duration={1.4}
                              easingFunction={easeQuadInOut}
                            >
                              {(value) => {
                                const roundedValue = Math.round(value);
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                    })}
                                  />
                                );
                              }}
                            </AnimatedProgressProvider>
                          </Card.Title>
                          <hr></hr>
                          <Card.Text
                            style={{ color: "green", textAlign: "center" }}
                          >
                            {this.state.data.subtotal[0].Age +
                              this.state.data.subtotal[2][
                                "Certificate of qualification"
                              ] +
                              this.state.data.subtotal[3][
                                "Provincial nomination"
                              ] +
                              this.state.data.subtotal[3]["Job offer"] +
                              this.state.data.subtotal[3][
                                "Sibling in Canada"
                              ]}{" "}
                            / 975
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              </>
            ) : null}
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

export default RightComponent;
