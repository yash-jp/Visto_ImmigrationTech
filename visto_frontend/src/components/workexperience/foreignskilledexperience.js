import React from "react";
import Button from "../submitbtn/internationalexp.js";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../header";
import Footer from "../footer";
class ForeignSkillExperience extends React.Component {
  constructor() {
    super();
    this.state = {
      foreign_experience: "",
    };
    this.internationalworkexperienceselected = this.internationalworkexperienceselected.bind(
      this
    );
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    let usertoken = sessionStorage.getItem("token");
    fetch("https://capestone-visto-server.herokuapp.com/api/invisible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 0) {
        } else if (data.status === 1) {
          alert("Error in component did mount of foreignskilled");
        }
      });
  }

  internationalworkexperienceselected(e) {
    if (e.target.value === "select") {
      this.setState({
        foreign_experience: "",
      });
    } else {
      this.setState({
        foreign_experience: e.target.value,
      });
    }
  }

  submitData() {
    let usertoken = sessionStorage.getItem("token");

    console.log("State data" + JSON.stringify(this.state));
    fetch(
      "https://capestone-visto-server.herokuapp.com/api/foreign-experience",
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
          alert(data.message);
        } else if (data.status == 0) {
          this.props.history.push("/certificateorqualification");
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
              paddingTop: "10vh",
              paddingBottom: "5vh",
              border: "1px solid black",
              boxShadow: "2px 3px black",
              marginTop: "5vh",
              marginBottom: "5vh",
              textAlign: "center",
            }}
          >
            <p>
              In the last 10 years, how many total years of foreign skilled work
              experience do you have?
            </p>
            <p>
              It must have been paid, full-time (or an equal amount in
              part-time), and in only one occupation (NOC skill type 0, A or B).
            </p>

            <select
              name="internationalexperience"
              onChange={this.internationalworkexperienceselected}
            >
              <option value="select">---SELECT---</option>
              <option value="None or less than a year">
                None or less than a year
              </option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years or more">3 years or more</option>
            </select>

            {this.state.foreign_experience !== "" ? (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
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

export default withRouter(ForeignSkillExperience);
