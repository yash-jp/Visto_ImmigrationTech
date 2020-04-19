import React, { Component } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import Animate from "animate.css-react";
import Footer from "../footer";
import Header from "../header";
class UserDashboardWithoutIELTS extends Component {
  state = {
    username: "",
  };

  componentDidMount() {
    this.setState({
      username: decode(sessionStorage.getItem("token")).first_name,
    });
  }

  render() {
    return (
      <>
        <Header />
        <div
          style={{
            width: "50%",
            margin: " 20vh auto",
          }}
        >
          <Animate appear="fadeInDown" durationAppear={2500} component="div">
            <h3>Welcome {this.state.username} !!</h3>
            <h3>Looks like you are new to here !!</h3>
            <h3>Lets Get You Started</h3>
            <h3>Please start by creating your application Profile</h3>
            <Link to={{ pathname: "/calculator" }}>
              <button class="btn tempting-azure-gradient">
                Calculate Score
              </button>
            </Link>
          </Animate>
        </div>
        <Footer />
      </>
    );
  }
}

export default UserDashboardWithoutIELTS;
