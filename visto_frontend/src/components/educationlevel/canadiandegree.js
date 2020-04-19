import React from "react";
import LevelOfEducation from "./levelofeducation";
import Button from "../submitbtn/index";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../header";
import Footer from "../footer";

class CanadianDegree extends React.Component {
  constructor() {
    super();
    this.state = {
      submitDatastate: "",
      level_of_education: "",
    };
    this.submitData = this.submitData.bind(this);
    this.canadianlevelofedu = this.canadianlevelofedu.bind(this);
  }

  canadianlevelofedu(e) {
    if (e.target.value == "select") {
      this.setState({
        level_of_education: "",
      });
    } else {
      this.setState({
        level_of_education: e.target.value,
      });
    }
  }

  TODObackendnotgettingtranslateddatajsonstringify;
  submitData() {
    let usertoken = sessionStorage.getItem("token");
    let data = {
      // canadiandegree: this.state.canadiandegree,
      level_of_education: this.state.level_of_education,
    };
    fetch(
      "https://capestone-visto-server.herokuapp.com/api/canadian-education",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": usertoken,
        },

        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          alert(data.message);
        } else if (data.status === 0) {
          this.props.history.push("/ielts");
        }
      });
  }

  render() {
    return (
      <>
        <Header />
        {/* FIXME Background color fix  */}
        <Row
          style={{
            backgroundColor: "lightblue",
            minHeight: "calc(67.5vh)",
          }}
        >
          <Col
            md={{ span: 6, offset: 3 }}
            sm={{ offset: 2 }}
            xs={{ offset: 0 }}
            style={{
              paddingTop: "3vh",
              border: "1px solid black",
              backgroundColor: "white",
              boxShadow: "3px 3px black",
              marginBottom: "3vh",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <h4>Please select your status</h4>

            <p>Have you earned a Canadian degree, diploma or certificate?</p>
            <p>
              Note: to answer yes: <br />
              a. English or French as a Second Language must not have made up
              more than half your study. <br /> b. you must not have studied
              under an award that required you to return to your home country
              after graduation to apply your skills and knowledge. <br /> c. you
              must have studied at a school within Canada (foreign campuses
              don’t count). <br /> d. you had to be enrolled full time for at
              least eight months, and have been physically present in Canada for
              at least eight months
            </p>

            <div style={{ marginBottom: "20px" }}>
              <LevelOfEducation
                submitData={this.submitData}
                submitDataState={this.submitDataState}
                canadianlevelofedufn={this.canadianlevelofedu}
                canadianlevelofedu={this.state.level_of_education}
              />
            </div>
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default withRouter(CanadianDegree);
