import React from "react";
import { Row, Col } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validateLogin: false,
      errorMsg: "",
      user_type: "",
    };

    this.handleModelOpenfn = this.handleModelOpenfn.bind(this);
    this.handleloginclose = this.handleloginclose.bind(this);
    this.setUserType = this.setUserType.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  clearData() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("user").checked = false;
    document.getElementById("admin").checked = false;
  }

  componentWillMount() {
    sessionStorage.clear();
    sessionStorage.setItem("LoggedIn", "false");
  }

  handleloginclose() {
    this.setState(
      {
        validateLogin: false,
      },
      () => {
        this.clearData();
      }
    );
  }

  handleModelOpenfn() {
    this.setState({
      validateLogin: true,
    });
  }

  setUserType(e) {
    console.log(e.target.id);
    this.setState({
      user_type: e.target.id,
    });
  }

  loginfunction = (props) => {
    if (
      document.getElementById("username").value === "" ||
      document.getElementById("password").value === ""
    ) {
      this.setState({
        errorMsg: "Please Provide Both Values",
      });
      this.handleModelOpenfn();
    } else {
      let data = {
        email: document.getElementById("username").value,
        password: document.getElementById("password").value,
        user_type: this.state.user_type,
      };
      axios
        .post(
          "https://capestone-visto-server.herokuapp.com/api/auth/login",
          data
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            {
              this.setState({
                errorMsg: res.data.message,
              });
              this.handleModelOpenfn();
            }
          } else if (res.data.status === 0) {
            if (this.state.user_type == "user") {
              let password = document.getElementById("password").value;
              let decodedData = decode(res.data.token);
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("LoggedIn", "true");
              sessionStorage.setItem("type", this.state.user_type);
              this.props.history.push({
                pathname: "/userdashboard",
                state: { password: password },
              });
            } else if (this.state.user_type == "admin") {
              let decodedData = decode(res.data.token);
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("LoggedIn", "true");
              sessionStorage.setItem("type", "admin");
              this.props.history.push({
                pathname: "/adminPage",
              });
            }
          }
        })
        .catch((err) => console.error(err));
    }
  };

  render() {
    return (
      <>
        <Col
          style={{
            marginBottom: "20px",
            backgroundColor: "white",
            boxShadow: "3px 4px 3px black",
            marginTop: "15px",
            border: "1px solid black",
          }}
          xl={{ span: 4, offset: "4" }}
          lg={{ span: 4, offset: "4" }}
          md={{ offset: "3", span: "6" }}
        >
          <Row>
            <Col
              style={{ marginTop: "30px" }}
              xl={{ span: "4", offset: "4" }}
              md={{ span: "6", offset: "3" }}
            >
              <p className="h5 text-center">LOGIN IN</p>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "40px" }}
              xl={{ span: "1", offset: "3" }}
              md={{ span: "3", offset: "2" }}
              xs={{ span: "2", offset: "4" }}
            >
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="user"
                  name="materialExampleRadios"
                  onClick={this.setUserType}
                />
                <label class="form-check-label" for="user">
                  User
                </label>
              </div>
            </Col>
            <Col
              style={{ marginTop: "40px" }}
              xl={{ offset: "0" }}
              md={{ span: "2", offset: "1" }}
              xs={{ span: "2" }}
            >
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="admin"
                  name="materialExampleRadios"
                  onClick={this.setUserType}
                />
                <label class="form-check-label" for="admin">
                  Admin
                </label>
              </div>
            </Col>

            <MDBContainer>
              <MDBRow
                style={{
                  width: "80%",
                  height: "50.3vh",
                }}
                center="true"
              >
                <Col
                  xl={{ offset: "4", span: "10" }}
                  md={{ offset: "4", span: "11" }}
                  xs={{ offset: "6", span: "12" }}
                >
                  <form style={{ marginTop: "5vh" }}>
                    <div className="grey-text">
                      <MDBInput label="Type your email" id="username" />
                      <MDBInput
                        type="password"
                        label="Type your password"
                        id="password"
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn
                        style={{ marginTop: "5vh" }}
                        onClick={this.loginfunction}
                      >
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                  <Row>
                    <div style={{ display: "flex" }}>
                      <Col
                        style={{ marginTop: "3.5vh" }}
                        xl={{ span: "7", offset: "0" }}
                      >
                        <h6>Forgot Password?</h6>
                      </Col>
                      <Col xl={{ span: "6", offset: "0" }}>
                        <Link to={{ pathname: "/signup" }}>
                          <h6 style={{ color: "black" }}>Sign Up here</h6>
                        </Link>
                      </Col>
                    </div>
                  </Row>
                </Col>
              </MDBRow>
            </MDBContainer>
          </Row>
        </Col>
        <Modal
          show={this.state.validateLogin}
          onHide={this.handleloginclose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-center">
              <span style={{ color: "red" }}>{this.state.errorMsg}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.handleloginclose}>OK</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(UserLogin);
