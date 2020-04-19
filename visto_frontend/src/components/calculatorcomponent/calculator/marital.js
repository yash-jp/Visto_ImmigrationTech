import React from "react";
import YesComponent from "../../yescomponent";
import NoComponent from "../../nocomponent";
import { Row, Col } from "react-bootstrap";
import { Animated } from "react-animated-css";
import { withRouter } from "react-router-dom";
import Footer from "../../footer";
class CalculatorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "",
      marital_status_type: "",
      spouse_citizen: null,
      spouse_coming_canada: null,
      notMarriedOptionValue: "",
      submitDatastate: "",
      educationlevelstate: "",
    };
    this.radioChange = this.radioChange.bind(this);
    this.citizenofCanada = this.citizenofCanada.bind(this);
    this.marriedornot = this.marriedornot.bind(this);
    this.clpcmgtocanada = this.clpcmgtocanada.bind(this);
    this.notmarriedstatus = this.notmarriedstatus.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value,
      marital_status_type: "",
      spouse_citizen: null,
      spouse_coming_canada: null,
      notMarriedOptionValue: "",
      submitDatastate: "",
      educationlevelstate: "",
    });
  }

  marriedornot(e) {
    if (e.target.value === "select") {
      this.setState({
        marital_status_type: "",
      });
    } else {
      this.setState({
        marital_status_type: e.target.value,
      });
    }
  }

  citizenofCanada(e) {
    if (e.target.value === "select") {
      this.setState({
        spouse_citizen: null,
        spouse_coming_canada: null,
      });
    } else {
      this.setState({
        spouse_citizen: e.target.value,
        spouse_coming_canada: null,
      });
    }
  }

  clpcmgtocanada(e) {
    if (e.target.value === "select") {
      this.setState({
        spouse_coming_canada: null,
      });
    } else {
      this.setState({
        spouse_coming_canada: e.target.value,
      });
    }
  }

  notmarriedstatus(e) {
    this.setState({
      notMarriedOptionValue: e.target.value,
    });
  }

  submitData() {
    let usertoken = sessionStorage.getItem("token");
    let data;
    if (this.state.spouse_coming_canada != null) {
      data = {
        marital_status_type: this.state.marital_status_type,
        spouse_citizen: this.state.spouse_citizen,
        spouse_coming_canada: this.state.spouse_coming_canada,
      };
    } else {
      data = {
        marital_status_type: this.state.marital_status_type,
        spouse_citizen: this.state.spouse_citizen,
      };
    }
    console.log(data);
    // fetch("https://capestone-visto-server.herokuapp.com/api/marital-status", {
    fetch("http://localhost:5001/api/marital-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 1) {
          return alert("Error in data");
        } else {
          this.props.history.push("/levelofedu");
        }
      });
  }
  render() {
    return (
      <>
        {/* <div
          style={{
            marginBottom: "5.5vh",
            width: "100%",
            backgroundColor: "red"
          }}
        > */}
        <Row style={{ width: "100%" }}>
          <Col
            md={{ span: 4, offset: 4 }}
            sm={{ span: 2, offset: 5 }}
            xs={{ span: 6, offset: 3 }}
            style={{ marginTop: "20px" }}
          >
            MARITAL STATUS
          </Col>
          <Col
            xl={{ span: 6, offset: 3 }}
            md={{ span: 5, offset: 3 }}
            sm={{ span: 2, offset: 5 }}
            xs={{ span: 6, offset: 3 }}
            style={{ marginTop: "20px" }}
          >
            Are you married?{" "}
          </Col>
          <Col
            xl={{ span: 2, offset: 3 }}
            md={{ span: 3, offset: 2 }}
            sm={{ span: 2, offset: 4 }}
            xs={{ span: 1, offset: 3 }}
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <input
              type="radio"
              value="Yes"
              style={{ paddingRight: "40px" }}
              checked={this.state.selectedOption === "Yes"}
              onChange={this.radioChange}
            />
            Yes
          </Col>
          <Col
            md={{ span: 0 }}
            sm={{ span: 2 }}
            xs={{ span: 2, offset: 2 }}
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <input
              type="radio"
              value="No"
              checked={this.state.selectedOption === "No"}
              onChange={this.radioChange}
            />
            No
          </Col>
        </Row>

        {this.state.selectedOption === "Yes" ? (
          <Animated
            animationIn="fadeIn"
            animationOut="zoomOutDown"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <YesComponent
              marriedfn={this.marriedornot}
              marriedstate={this.state.marital_status_type}
              citizenfn={this.citizenofCanada}
              spouse_citizenStateValue={this.state.spouse_citizen}
              clpcmgtocanada={this.clpcmgtocanada}
              clpcmgtocanadastate={this.state.spouse_coming_canada}
              submitfn={this.submitData}
              submitstatedata={this.state.submitDatastate}
              loe={this.levelofeducation}
              loestate={this.state.educationlevelstate}
            />
          </Animated>
        ) : (
          [
            this.state.selectedOption === "No" ? (
              <Animated
                animationIn="fadeIn"
                animationInDuration={1000}
                isVisible={true}
              >
                <NoComponent
                  notmarriedfn={this.notmarriedstatus}
                  notmarriedvalue={this.state.notMarriedOptionValue}
                  submitfn={this.submitData}
                  submitstatedata={this.state.submitDatastate}
                  loe={this.levelofeducation}
                  loestate={this.state.educationlevelstate}
                />
              </Animated>
            ) : null,
          ]
        )}
      </>
    );
  }
}

export default withRouter(CalculatorPage);
