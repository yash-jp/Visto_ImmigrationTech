import React from "react";
import { Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Button from "../../submitbtn/index";
import Header from "../../header";
import Footer from "../../footer";

class UpdateEdu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level_of_education: "",
    };
    this.canadianlevelofedu = this.canadianlevelofedu.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {}
  canadianlevelofedu(e) {
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

    fetch(
      "https://capestone-visto-server.herokuapp.com/api/canadian-education",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": usertoken,
        },

        body: JSON.stringify(this.state),
      }
    )
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
            minHeight: "calc(70.3vh)",
            backgroundColor: "#32705e",
          }}
        >
          <Col
            xl={{ span: "4", offset: "4" }}
            style={{
              backgroundColor: "white",
              marginTop: "20px",
              marginBottom: "20px",
              boxShadow: "5px 5px #888888",
            }}
          >
            <Col
              md={{ span: 6, offset: 3 }}
              style={{ textAlign: "center", marginTop: "10vh" }}
            >
              Choose the best answer to describe the level of your education
              <select
                style={{ width: "200px", marginTop: "50px" }}
                onChange={this.canadianlevelofedu}
              >
                <option name="select" value="select">
                  ---SELECT---
                </option>
                <option name="school" value="secondary">
                  Secondary (high school) or less
                </option>
                <option name="school" value="one_or_two">
                  One- or two-year diploma or certificate
                </option>
                <option name="school" value="three_or_more_or_masters">
                  Certificate(3 years)/Master’s/Doctoral
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

export default withRouter(UpdateEdu);
