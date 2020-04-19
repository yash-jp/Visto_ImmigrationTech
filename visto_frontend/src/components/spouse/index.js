import React from "react";
import SpouseWorkExp from "./spouseworkexp";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../header";
import Footer from "../footer";
class Spouse extends React.Component {
  constructor() {
    super();
    this.state = {
      education: "",
      ieltsValid: "",
      work_experience: "",
      speaking: "",
      reading: "",
      writing: "",
      submitDatastate: "",
      listening: "",
    };
    this.ieltsValid = this.ieltsValid.bind(this);
    this.speaking = this.speaking.bind(this);
    this.reading = this.reading.bind(this);
    this.listening = this.listening.bind(this);
    this.writing = this.writing.bind(this);
    this.submitData = this.submitData.bind(this);
    this.spouseedulevel = this.spouseedulevel.bind(this);
    this.spouseworkexperience = this.spouseworkexperience.bind(this);
  }

  ieltsValid(e) {
    this.setState({
      ieltsValid: e.target.value,
    });
  }

  spouseedulevel(e) {
    if (e.target.value === "select") {
      this.setState({
        education: "",
      });
    } else {
      this.setState({
        education: e.target.value,
      });
    }
  }

  spouseworkexperience(e) {
    if (e.target.value === "select") {
      this.setState({
        work_experience: "",
      });
    } else {
      this.setState({
        work_experience: e.target.value,
      });
    }
  }

  speaking(e) {
    console.log(e.target.value);
    if (e.target.value === "select") {
      this.setState({
        speaking: "",
      });
    } else {
      this.setState({
        speaking: e.target.value,
      });
    }
  }

  reading(e) {
    if (e.target.value === "select") {
      this.setState({
        reading: "",
      });
    } else {
      this.setState({
        reading: e.target.value,
      });
    }
  }

  writing(e) {
    if (e.target.value === "select") {
      this.setState({
        writing: "",
      });
    } else {
      this.setState({
        writing: e.target.value,
      });
    }
  }

  listening(e) {
    if (e.target.value === "select") {
      this.setState({
        listening: "",
      });
    } else {
      this.setState({
        listening: e.target.value,
      });
    }
  }

  componentDidMount() {
    fetch(
      "https://capestone-visto-server.herokuapp.com/api/misc/isSpouseComing",
      {
        "Content-Type": "application/json",
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "1") {
          this.props.history.push("/finalPage");
        } else if (data.status == "0") {
        }
      });
  }

  submitData() {
    console.log("State data" + JSON.stringify(this.state));
    let usertoken = sessionStorage.getItem("token");
    fetch("https://capestone-visto-server.herokuapp.com/api/spouse-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          alert(data.message);
        } else if (data.status === 0) {
          this.props.history.push("/finalPage");
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
            <h5>
              What is the highest level of education for which your spouse or
              common-law partner's has: earned a Canadian degree, diploma or
              certificate; or had an Educational Credential Assessment (ECA)?
              (ECAs must be from an approved agency, in the last five years)
            </h5>
            <p>
              To get the correct number of points, make sure you choose the
              answer that best reflects your case. For example: If you have TWO
              Bachelor’s degrees, or one Bachelor’s AND a two year college
              diploma, choose – “Two or more certificates, diplomas, or degrees.
              One must be for a program of three or more years.”
            </p>

            <select style={{ width: "400px" }} onChange={this.spouseedulevel}>
              FIXMEMake the option as common component for spouse education and
              education above in the calculator
              <option name="select" value="select">
                ---SELECT---
              </option>
              <option name="education" value="none">
                None, or less than secondary (high school)
              </option>
              <option name="education" value="secondary">
                Secondary diploma (high school graduation)
              </option>
              <option name="education" value="one-year">
                One-year program at a university, college, trade or technical
                school, or other institute
              </option>
              <option name="education" value="two-year">
                Two-year program at a university, college, trade or technical
                school, or other institute
              </option>
              <option name="education" value="bachelors">
                Bachelor's degree (three or more year program at a university,
                college, trade or technical school, or other institute)
              </option>
              <option name="education" value="twoOrMoreCertificate">
                Two or more certificates, diplomas or degrees. One must be for a
                program of three or more years
              </option>
              <option name="education" value="masters">
                Master's degree, or professional degree needed to practice in a
                licensed profession (see Help)
              </option>
              <option name="education" value="doctoral">
                Doctoral level university degree (PhD)
              </option>
            </select>

            {this.state.education !== "" ? (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
                isVisible={true}
              >
                <div style={{ margin: "10px auto" }}>
                  <SpouseWorkExp
                    spouseworkexperiencefn={this.spouseworkexperience}
                    spouseworkexperiencestate={this.state.work_experience}
                    speakingState={this.state.speaking}
                    speakingfn={this.speaking}
                    listeningState={this.state.listening}
                    listeningfn={this.listening}
                    readingState={this.state.reading}
                    readingfn={this.reading}
                    writingfn={this.writing}
                    writingState={this.state.writing}
                    submitfn={this.submitData}
                  />
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

export default withRouter(Spouse);
