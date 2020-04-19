import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const withoutLogin = [];

const adminLogin = [["Admin Dashboard", "/adminPage"]];

const userLogin = [["User Dashboard", "/userdashboard"]];

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarItems: [],
      userLoggedIn: false,
    };

    this.handlelogoutbutton = this.handlelogoutbutton.bind(this);
  }

  handlelogoutbutton() {
    this.setState({
      navbarItems: withoutLogin,
      userLoggedIn: false,
    });
    this.props.history.push("/login");
  }

  componentDidMount() {
    console.log(this.state);
    // If user and also if user is admin
    if (
      sessionStorage.getItem("LoggedIn") === "true" &&
      sessionStorage.getItem("type") === "admin"
    ) {
      this.setState({
        navbarItems: adminLogin,
        userLoggedIn: true,
      });
    } else if (
      sessionStorage.getItem("LoggedIn") === "true" &&
      sessionStorage.getItem("type") === "user"
    ) {
      this.setState({
        navbarItems: userLogin,
        userLoggedIn: true,
      });
    } else if (sessionStorage.getItem("LoggedIn") === "false") {
      this.setState({
        navbarItems: withoutLogin,
        userLoggedIn: false,
      });
    }
  }

  render() {
    return (
      <>
        <Col style={{ backgroundColor: "purple", padding: "0px" }}>
          <Navbar collapseOnSelect bg="light" variant="dark">
            <Navbar.Brand href="/">
              <img
                src="https://visto.ai/wp-content/uploads/2019/10/wide_logo.svg"
                style={{ height: "30px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                {this.state.navbarItems.map((navitem, index) => (
                  <Link
                    to={{
                      pathname: navitem[1],
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "black" }}>{navitem[0]}</span>
                  </Link>
                ))}
                {this.state.userLoggedIn === true ? (
                  <button
                    type="submit"
                    variant="outline-light"
                    style={{
                      border: "none",
                      backgroundColor: "#E0E0E0  ",
                      color: "lightblack",
                      fontWeight: "10",
                      marginRight: "20px",
                      marginLeft: "20px",
                    }}
                    onClick={this.handlelogoutbutton}
                    value="LOGOUT"
                  >
                    LOGOUT
                  </button>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </>
    );
  }
}

export default withRouter(Header);
