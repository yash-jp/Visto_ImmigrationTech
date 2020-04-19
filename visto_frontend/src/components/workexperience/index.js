import React from "react";
import Button from "../submitbtn/index";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../header";
import Footer from "../footer";

class WorkExperience extends React.Component {
  constructor() {
    super();
    this.state = {
      years: "",
    };
    this.canadianexpselected = this.canadianexpselected.bind(this);

    this.submitData = this.submitData.bind(this);
  }
  canadianexpselected(e) {
    console.log(e.target.value);
    if (e.target.value == "select") {
      this.setState({
        years: "",
      });
    } else {
      this.setState({
        years: e.target.value,
      });
    }
  }

  submitData() {
    let usertoken = sessionStorage.getItem("token");

    fetch(
      "https://capestone-visto-server.herokuapp.com/api/canadian-experience",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": usertoken,
        },
        body: JSON.stringify(this.state),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 1) {
          alert("data not stores properly");
        } else if (data.status == 0) {
          this.props.history.push("/foreignworkexp");
        }
      });
  }

  render() {
    return (
      <>
        <Header />
        <Row
          style={{
            backgroundColor: "white",
            minHeight: "calc(67.5vh)",
          }}
        >
          <Col
            xl={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
            md={{ span: 4, offset: 4 }}
            style={{
              backgroundColor: "white",
              paddingTop: "2vh",
              border: "1px solid black",
              boxShadow: "2px 3px black",
              marginTop: "5vh",
              marginBottom: "5vh",
              textAlign: "center",
            }}
          >
            {/* FIXME CHnage background color */}
            <div>Work Experience</div>
            <p>
              i. In the last ten years, how many years of skilled work
              experience in Canada do you have?
            </p>
            <p>
              It must have been paid and full-time (or an equal amount in
              part-time).
            </p>
            <p>
              Note: In Canada, the National Occupational Classification (NOC) is
              the official list of all the jobs in the Canadian labour market.
              It describes each job according to skill type, group and level.
            </p>
            <p>
              "Skilled work" in the NOC is:
              <br />
              managerial jobs (NOC Skill Level 0)
              <br />
              professional jobs (NOC Skill Type A)
              <br />
              technical jobs and skilled trades/manual work (NOC Skill Type B)
              <br />
            </p>
            <sup style={{ color: "red" }}>*</sup> If you aren’t sure of the NOC
            level for this job, you can{" "}
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/find-national-occupation-code.html">
              find your NOC.
            </a>
            <select
              name="workexperienceoptions"
              onChange={this.canadianexpselected}
            >
              <option value="select">---SELECT---</option>
              <option value="none or less than a year">
                None or less than a year
              </option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years or more">5 years or more</option>
            </select>
            {this.state.years !== "" ? (
              <Animated
                animationIn="fadeIn"
                animationOut="zoomOutDown"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}
              >
                <div style={{ margin: "20px auto" }}>
                  <Button apiCall={this.submitData} />
                </div>
              </Animated>
            ) : null}
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default withRouter(WorkExperience);
