import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validateSignUp: false,
      user_type: "",
      errorMsg: "",
      modalactive: "false",
    };

    this.setUserInput = this.setUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelOpenfn = this.handleModelOpenfn.bind(this);
    this.handleSignUpclose = this.handleSignUpclose.bind(this);
    this.removeallData = this.removeallData.bind(this);
  }

  handleSignUpclose() {
    if (this.state.modalactive == "true") {
      console.log(this.state.validateSignUp);
      this.setState(
        {
          validateSignUp: false,
        },
        () => {
          document.getElementById("user").checked = false;
          document.getElementById("admin").checked = false;
          this.props.history.push("/signup");
        }
      );
    } else if (this.state.modalactive == "false") {
      this.setState(
        {
          validateSignUp: true,
        },
        () => {
          document.getElementById("user").checked = false;
          document.getElementById("admin").checked = false;
          this.props.history.push("/login");
        }
      );
    }
  }
  removeallData() {
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("country").value = "";
    document.getElementById("confmpassword").value = "";
  }

  handleModelOpenfn() {
    this.setState({
      validateSignUp: true,
    });
  }

  setUserInput(e) {
    this.setState({
      user_type: e.target.id,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      document.getElementById("password").value != "" &&
      document.getElementById("email").value != "" &&
      document.getElementById("first_name").value != "" &&
      document.getElementById("last_name").value != "" &&
      document.getElementById("country").value != "" &&
      document.getElementById("confmpassword").value != ""
    ) {
      let data = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        country: document.getElementById("country").value,
        user_type: this.state.user_type,
      };
      axios
        .post(
          "https://capestone-visto-server.herokuapp.com/api/auth/sign-up",
          data
        )
        .then((res) => {
          console.log(res.data);
          if (res.data["status"] == "0") {
            this.setState({
              errorMsg: res.data.message,
            });
            this.handleModelOpenfn();
          } else if (res.data["staus"] == "1") {
            this.props.history.push("/login");
          }
        })
        .catch((err) => console.error(err));
    } else {
      this.setState({
        errorMsg: "Please enter all the details",
        modalactive: "true",
      });
      this.handleModelOpenfn();
    }
  }

  componentDidUpdate() {
    this.removeallData();
  }

  render() {
    return (
      <>
        <Row>
          <Col style={{ marginTop: "20px" }} xl={{ offset: "4", span: "4" }}>
            <p className="h5 text-center">Sign up</p>
          </Col>
        </Row>
        <Row>
          <MDBContainer>
            <MDBRow>
              <Col xl={{ span: "4", offset: "4" }}>
                <MDBCard
                  style={{
                    marginTop: "10px",
                    boxShadow: "3px 4px 3px black",
                    marginBottom: "30px",
                  }}
                >
                  <MDBCardBody>
                    <form>
                      <div className="grey-text">
                        <Row>
                          <Col
                            style={{ marginTop: "10px", marginBottom: "20px" }}
                            xl={{ span: "4", offset: "2" }}
                          >
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                id="user"
                                name="type"
                                onClick={this.setUserInput}
                              />
                              <label class="custom-control-label" for="user">
                                User
                              </label>
                            </div>
                          </Col>
                          <Col
                            style={{ marginTop: "10px", marginBottom: "20px" }}
                            xl={{ span: "4" }}
                          >
                            <div class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                id="admin"
                                name="type"
                                onClick={this.setUserInput}
                              />
                              <label class="custom-control-label" for="admin">
                                Admin
                              </label>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={{ span: "6" }}>
                            <MDBInput
                              label="First Name"
                              group
                              type="text"
                              id="first_name"
                            />
                          </Col>
                          <Col xl={{ span: "6" }}>
                            <MDBInput
                              label="Last Name"
                              group
                              type="text"
                              id="last_name"
                            />
                          </Col>
                          <Col xl={{ span: "12" }}>
                            <MDBInput
                              label="Your email"
                              group
                              type="email"
                              id="email"
                              placeholder="sachinjav@gmail.com"
                            />
                          </Col>
                          <Col xl={{ span: "12" }}>
                            <MDBInput
                              label="Country"
                              group
                              type="text"
                              id="country"
                            />
                          </Col>
                          <Col xl={{ span: "6" }} className="passwordclass">
                            <MDBInput
                              label="Password"
                              group
                              type="password"
                              id="password"
                            />
                          </Col>
                          <Col xl={{ span: "6" }}>
                            <MDBInput
                              label="Confirm password"
                              group
                              type="password"
                              id="confmpassword"
                              validate
                            />
                          </Col>
                        </Row>
                        <div className="text-center">
                          <MDBBtn
                            color="cyan"
                            type="submit"
                            onClick={this.handleSubmit}
                          >
                            Register
                          </MDBBtn>
                        </div>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </Col>
            </MDBRow>
          </MDBContainer>
        </Row>
        <Modal
          show={this.state.validateSignUp}
          onHide={this.handleSignUpclose}
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
            <Button onClick={this.handleSignUpclose}>OK</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(FormExample);
