import React from "react";
import { Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Button from "../../submitbtn/index";
import Header from "../../header";
import Footer from "../../footer";
class UpdateForeignEdu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level_of_education: "",
    };
    this.levelofeducation = this.levelofeducation.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {}
  levelofeducation(e) {
    console.log(e);
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

  submitData() {
    {
      console.log(this.state.level_of_education);
    }

    let usertoken = sessionStorage.getItem("token");

    fetch("https://capestone-visto-server.herokuapp.com/api/education", {
      method: "PUT",
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
          this.props.history.push("/userdashboard");
          //   console.log(data);
        }
      });
  }

  render() {
    return (
      <>
        <Header />
        <Row
          style={{
            backgroundColor: "lightgreen",
            minHeight: "calc(70.3vh)",
          }}
        >
          <Col
            xl={{ span: "4", offset: "4" }}
            // md={{ span: 5, offset: 4 }}
            // sm={{ offset: 2 }}
            // xs={{ offset: 1 }}
            style={{
              backgroundColor: "white",
              marginTop: "20px",
              marginBottom: "20px",
              boxShadow: "5px 5px #888888",
            }}
          >
            <Col
              md={{ span: 11, offset: 0 }}
              style={{ textAlign: "center", marginTop: "10vh" }}
            >
              <h5>What is the level of education ?</h5>
              <h5>Enter the highest level of education you have achieved </h5>

              <select
                style={{ width: "400px", marginTop: "4vh" }}
                onChange={this.levelofeducation}
              >
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
                  One-year program at a university, college
                </option>
                <option name="education" value="two-year">
                  Two-year program at a university, college
                </option>
                <option name="education" value="bachelors">
                  Bachelor's degree (3+ years university, college)
                </option>
                <option name="education" value="masters">
                  Master's degree/licensed practice
                </option>
                <option name="education" value="doctoral">
                  Doctoral level university degree (PhD)
                </option>
              </select>
            </Col>
            {this.state.level_of_education != "" ? (
              <div style={{ marginTop: "20px" }}>
                <Button apiCall={this.submitData} />
              </div>
            ) : null}
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

export default withRouter(UpdateForeignEdu);
