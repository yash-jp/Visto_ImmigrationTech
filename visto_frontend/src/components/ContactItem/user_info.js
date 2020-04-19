import React, { Component } from "react";
import Header from "../header";
import Footer from "../footer";
import { withRouter } from "react-router-dom";
import { Row, Col, Image, Container } from "react-bootstrap";
import Img from "./image/profilepicture.jpg";
class UserInfo extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    console.log(this.props.location.state.user[0]);
    let usertoken = sessionStorage.getItem("token");
    fetch(
      `https://capestone-visto-server.herokuapp.com/api/admin/getUser/${this.props.location.state.user[0].user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": usertoken,
          // user_id: this.props.location.state.user[0].user_id,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      });
  }

  render() {
    return (
      <>
        <Header />
        <Container
          style={{
            marginTop: "5vh",
            marginBottom: "5vh",
            width: "62.5%",
          }}
        >
          <Row>
            <Col
              style={{
                marginTop: "1.5vh",
                fontFamily: "Times New Roman, Times, serif",
                fontWeight: "500",
                fontSize: "150%",
                marginBottom: "3vh",
              }}
              xl={{ offset: "8" }}
              lg={{ offset: "8" }}
              xs={{ offset: "7" }}
            >
              USER PROFILE
            </Col>
          </Row>

          <Col
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              border: "3px solid black",
            }}
            xl={{ offset: "4" }}
            lg={{ offset: "4" }}
            md={{ offset: "4" }}
            xs={{ offset: "4" }}
          >
            <Row>
              <Col
                style={{
                  padding: "10px",
                  backgroundColor: "darkgrey",
                  color: "white",
                }}
              >
                USER DETAILS
              </Col>
            </Row>
            <Row
              style={{
                borderBottom: "1px solid black",
              }}
            >
              <Col
                xl={{ span: "5" }}
                style={{ borderRight: "1px solid black", height: "30vh" }}
              >
                <Col xs={{ offset: "1" }}>
                  <Image
                    src={Img}
                    height={150}
                    id="image"
                    style={{ marginTop: "3vh", marginLeft: "-40px" }}
                  />
                </Col>
              </Col>
              <Col xl={{ span: "7" }} style={{ height: "30vh" }}>
                <Col
                  style={{
                    marginTop: "6vh",
                    marginLeft: "-10px",
                  }}
                  md={{ span: "12" }}
                >
                  Name: {this.props.location.state.user[0]["first_name"]}
                </Col>
                <Col
                  style={{ marginTop: "3vh", marginLeft: "35px" }}
                  md={{ span: "10" }}
                >
                  Email :{this.props.location.state.user[0]["email"]}
                </Col>
                <Col
                  style={{ marginTop: "3vh", marginLeft: "11px" }}
                  md={{ span: "11" }}
                >
                  Country:{this.props.location.state.user[0]["country"]}
                </Col>
              </Col>
            </Row>

            {this.state.data != "" ? (
              <>
                <Row>
                  <Col
                    style={{
                      padding: "10px",
                      backgroundColor: "darkgrey",
                      color: "white",
                    }}
                  >
                    PROFILE DETAILS
                  </Col>
                </Row>
                <Row
                  style={{
                    // backgroundColor: "lightgreen",
                    minHeight: "calc(49.8vh)",
                  }}
                >
                  {/* <Row> */}
                  <Col xl={{ span: 12 }}>
                    <div
                      style={{
                        textAlign: "center",
                        border: "2px solid black",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Core/Human Capital Factors
                    </div>
                    <Row>
                      <Col
                        xl={{ offset: 4, span: 2 }}
                        // lg={{ span: "3", offset: 3 }}
                        // md={{ span: 3, offset: "3" }}
                        // xs={{ span: 4, offset: "2" }}
                      >
                        Age :
                      </Col>
                      <Col
                        xl={{ span: 2 }}
                        // lg={{ span: "2" }}
                        // md={{ span: 4 }}
                        // xs={{ span: 4 }}
                      >
                        {this.state.data.subtotal[0].Age}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xl={{ offset: 4, span: 2 }}
                        //   lg={{ span: "2", offset: 4 }}
                        //   md={{ span: "3", offset: "3" }}
                        //   xs={{ span: "4", offset: "2" }}
                      >
                        Level Of Education
                      </Col>
                      <Col
                        xl={{ span: 2 }}
                        // lg={{ span: "2" }}
                        // md={{ span: "4" }}
                        // xs={{ span: "3" }}
                      >
                        {this.state.data.subtotal[0]["Level Of Education"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xl={{ offset: 4, span: 2 }}
                        // lg={{ span: "1", offset: "4" }}
                        // md={{ span: 3, offset: 3 }}
                        // xs={{ span: 4, offset: 1 }}
                      >
                        Language Proficiency{" "}
                      </Col>
                      <Col
                        xl={{ span: 2 }}
                        // lg={{ span: "1" }}
                        // md={{ span: 2 }}
                        // xs={{ span: 3, offset: "1" }}
                      >
                        {
                          this.state.data.subtotal[0][
                            "Official languages proficiency"
                          ]
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xl={{ offset: 4, span: 2 }}
                        // lg={{ offset: "4", span: "1" }}
                        // md={{ offset: "3", span: "2 " }}
                        // xs={{ offset: "1  ", span: "4" }}
                      >
                        CAD Work Experience
                      </Col>
                      <Col
                        xl={{ span: 2 }}
                        // lg={{ span: "1", offset: "1" }}
                        // md={{ span: "2" }}
                        // xs={{ span: "3", offset: "2" }}
                      >
                        {
                          this.state.data.subtotal[0][
                            "Canadian work experience"
                          ]
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xl={{ offset: 4, span: 2 }}
                        // lg={{ offset: 4, span: 1 }}
                        // md={{ span: 2, offset: 3 }}
                        // xs={{ span: 3, offset: 1 }}
                      >
                        SubTotal{" "}
                      </Col>
                      <Col
                        xl={{ span: 2 }}
                        // lg={{ span: 1 }}
                        // md={{ span: 2 }}
                        // xs={{ offset: 2 }}
                      >
                        {this.state.data.subtotal[0]["Subtotal"]}
                      </Col>
                    </Row>
                  </Col>

                  <Col xl={{ span: 12 }}>
                    <div
                      style={{
                        border: "2px solid black",
                        marginTop: "20px",
                        marginBottom: "20px",
                        textAlign: "center",
                      }}
                    >
                      Spouse Factors
                    </div>

                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>SubTotal :- </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[1]["Subtotal"]}
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={{ span: 12 }}>
                    <div
                      style={{
                        textAlign: "center",
                        border: "2px solid black",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Skills Transferability Factors
                    </div>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>Education :</Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[2]["Education"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>
                        Foreign Work Experience :
                      </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[2]["Foreign work experience"]}
                      </Col>
                    </Row>{" "}
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>
                        Certification Of qualification :
                      </Col>
                      <Col xl={{ span: 2 }}>
                        {
                          this.state.data.subtotal[2][
                            "Certificate of qualification"
                          ]
                        }
                      </Col>
                    </Row>{" "}
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>SubTotal :- </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[2]["Subtotal"]}{" "}
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={{ span: 12 }}>
                    <div
                      style={{
                        textAlign: "center",
                        border: "2px solid black",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Comprehensive Ranking
                    </div>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>
                        Provincial Nomination :
                      </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[3]["Provincial nomination"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>Job Offer :</Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[3]["Job offer"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>Study in Canada :</Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[3]["Study in Canada"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>
                        Immediate Relative :
                      </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[3]["Sibling in Canada"]}
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={{ span: 2, offset: 4 }}>SubTotal :- </Col>
                      <Col xl={{ span: 2 }}>
                        {this.state.data.subtotal[3]["Subtotal"]}
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xl={{ span: 12 }}
                    style={{ borderTop: "1px solid black", paddingTop: "15px" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      Grand Total :- &nbsp;{" "}
                      {this.props.location.state.user[0].score.crs_score}{" "}
                    </div>
                  </Col>
                </Row>
              </>
            ) : null}
          </Col>
        </Container>
        <Footer />
      </>
    );
  }
}

export default withRouter(UserInfo);
