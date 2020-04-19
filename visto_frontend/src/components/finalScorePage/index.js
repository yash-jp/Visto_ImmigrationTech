import React from "react";
import Header from "../header";
import { Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import Footer from "../footer";

class FinalScorePage extends React.Component {
  constructor() {
    super();
    this.state = {
      subtotal: [],
      grandtotal: "",
    };
  }

  componentDidMount() {
    let usertoken = sessionStorage.getItem("token");
    fetch("https://capestone-visto-server.herokuapp.com/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status == "1") {
          alert("Duplicate Data found");
        } else if (data.status == "0") {
          this.setState({
            subtotal: data.subtotal,
            grandtotal: data.GrandTotal,
          });
        }
      });
  }

  render() {
    return (
      <>
        <Header />
        <Col
          style={{
            backgroundColor: "white",
            minHeight: "calc(57.8vh)",
            marginBottom: "30px",
          }}
        >
          {/* FIXME DESIGN WHOLE PAGE AGAIN / FIX Current one */}
          {this.state.grandtotal != "" ? (
            <>
              <Row>
                <Col
                  xl={{ span: 6, offset: 3 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 4, offset: 4 }}
                  style={{ marginTop: "5vh", textAlign: "center" }}
                >
                  <h4>&nbsp;Your Final Score Is</h4>
                </Col>
                <Col
                  xl={{ span: 2, offset: 5 }}
                  lg={{ span: 2, offset: 5 }}
                  md={{ span: 4, offset: 4 }}
                  style={{ textAlign: "center" }}
                >
                  <CountUp
                    start={500}
                    end={this.state.grandtotal}
                    delay={0}
                    duration={3}
                  >
                    {({ countUpRef }) => (
                      <h3>
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      </h3>
                    )}
                  </CountUp>
                </Col>
              </Row>
              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 6, offset: 3 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3> Score Distribution</h3>
                </Col>
              </Row>
              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3> Core / Human Capital Factor</h3>
                </Col>
              </Row>

              {/* ********************* SECTION A ****************** */}
              {/* <div style={{ border: "1px solid black" }}> */}
              {/* AGE SECTION */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // borderLeft: "2px solid black",
                    // borderTop: "2px solid black",
                  }}
                >
                  Age
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                    // borderRight: "2px solid black",
                    // borderTop: "2px solid black",
                  }}
                >
                  {this.state.subtotal[0].Age}
                </Col>
              </Row>

              {/*  Level of Education Section*/}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // borderLeft: "2px solid black",
                  }}
                >
                  Level Of Education
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                    // borderRight: "2px solid black",
                  }}
                >
                  {this.state.subtotal[0]["Level of Education"]}
                </Col>
              </Row>

              {/*  Language Proficiency */}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // borderLeft: "2px solid black",
                  }}
                >
                  Language Profiency
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                  }}
                >
                  {this.state.subtotal[0]["Official languages proficiency"]}
                </Col>
              </Row>
              {/*  Canadian Work Experience */}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // borderLeft: "2px solid black",
                  }}
                >
                  Canadian Work Experience
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                  }}
                >
                  {this.state.subtotal[0]["Canadian work experience"]}
                </Col>
              </Row>

              {/*  SubTotal Section A */}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // borderLeft: "2px solid black",
                    // borderBottom: "2px solid black",
                  }}
                >
                  Subtotal :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    // borderRight: "2px solid black",
                    // borderBottom: "2px solid black",
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                  }}
                >
                  {this.state.subtotal[0].Subtotal}
                </Col>
              </Row>
              {/* </div> */}
              {/* ********************* SECTION B ****************** */}

              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3> Spouse Factors</h3>
                </Col>
              </Row>

              {/* Level Of Edu Spouse */}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Level Of Education :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[1]["Spouse Factors"]}
                </Col>
              </Row>

              {/*  Language Score Spouse */}

              {/* <Row>
              <Col
              xl={{ span: 2, offset: 4 }}
                lg={{ span: 2, offset: 4 }}
                md={{ span: 2, offset: 4 }}
                xs={{ span: 3, offset: 3 }}
                style={{
                  textAlign: "right",
                  backgroundColor: "#b2ebf2",
                  paddingRight: "30px",
                }}
                >
                Language Score :-
                </Col>
                <Col
                xl={{ span: 2 }}
                lg={{ span: 2 }}
                md={{ span: 2 }}
                xs={{ span: 4 }}
                style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                Language score here
                </Col>
                </Row>
                
                Canadian Work Experience 
                Level Of Edu Spouse
                
                <Row>
                <Col
                xl={{ span: 2, offset: 4 }}
                lg={{ span: 2, offset: 4 }}
                md={{ span: 2, offset: 4 }}
                xs={{ span: 3, offset: 3 }}
                style={{
                  textAlign: "right",
                  backgroundColor: "#b2ebf2",
                  paddingRight: "30px",
                }}
                >
                CAD Work Exp :-
                </Col>
                <Col
                xl={{ span: 2 }}
                lg={{ span: 2 }}
                md={{ span: 2 }}
                xs={{ span: 4 }}
                style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                Work Exp Score
                </Col>
              </Row> */}

              {/* Subtotal Spouse Section B */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Spouse Subtotal :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[1].Subtotal}
                </Col>
              </Row>

              {/* ***************************SECTION C ******************* */}
              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3>Skills Transferability factors </h3>
                </Col>
              </Row>

              {/* Education */}

              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Education :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[2].Education}
                </Col>
              </Row>

              {/* Foreign Work Experience */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Foreign Work Exp :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[2]["Foreign work experience"]}
                </Col>
              </Row>

              {/* Certificate Of Qualification */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Certificate Of Qualifn :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[2]["Certificate of qualification"]}
                </Col>
              </Row>

              {/* Subtotal  Section C*/}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Subtotal :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[2]["Subtotal"]}
                </Col>
              </Row>
              {/* **************************SECTION D******************** */}

              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3>Comprehensive Ranking System Formula </h3>
                </Col>
              </Row>
              {/* Provincial Nomination */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Provincial Nomination :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[3]["Provincial nomination"]}
                </Col>
              </Row>

              {/* Job Offer */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  JOb Offer :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[3]["Job Offer"]}
                </Col>
              </Row>

              {/* Study In Canada */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Study in canada :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[3]["Study in Canada"]}
                </Col>
              </Row>
              {/* Immediate Relative */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Immediate Relative :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[3]["Sibling in Canada"]}
                </Col>
              </Row>
              {/* Grand Total Section D */}
              {/* Job Offer */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                  }}
                >
                  Sub Total :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{ backgroundColor: "#b2ebf2", paddingLeft: "30px" }}
                >
                  {this.state.subtotal[3]["Subtotal"]}
                </Col>
              </Row>

              {/* **************************SECTION E******************** */}

              <Row>
                <Col
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  style={{
                    marginTop: "5vh",
                    textAlign: "center",
                  }}
                >
                  <h3>Grand Total </h3>
                </Col>
              </Row>

              {/* Grand Total */}
              <Row>
                <Col
                  xl={{ span: 2, offset: 4 }}
                  lg={{ span: 2, offset: 4 }}
                  md={{ span: 2, offset: 4 }}
                  xs={{ span: 3, offset: 3 }}
                  style={{
                    textAlign: "right",
                    backgroundColor: "#b2ebf2",
                    paddingRight: "30px",
                    // border: "2px solid black",
                    borderRight: "none",
                  }}
                >
                  Grand Total :-
                </Col>
                <Col
                  xl={{ span: 2 }}
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  xs={{ span: 4 }}
                  style={{
                    backgroundColor: "#b2ebf2",
                    paddingLeft: "30px",
                    // border: "2px solid black",
                    borderLeft: "none",
                  }}
                >
                  {this.state.grandtotal}
                </Col>
              </Row>
            </>
          ) : null}
        </Col>
        <Footer />
      </>
    );
  }
}

export default FinalScorePage;
