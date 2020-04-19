import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

// BOOTSTRAP
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// COMPONENTs
// FIXME
// import UserItem from "../../components/UserItem/userItem";
import ContactItem from "../../components/ContactItem/contactItem";
import Search from "../../components/Search/search";
import Header from "../header";
import Footer from "../footer";
// CSS
import "./index.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchable: {
        isSearch: false,
        searchBy: null,
      },
      filteredArray: null,
      id: "",
    };
  }

  handleRadioChange = (e) => {
    console.log(e.target);
    // check whether it's range or else
    if (
      e.target.value === "x<500" ||
      e.target.value === "x>=500ANDx<800" ||
      e.target.value === "x>=800ANDx<1200" ||
      e.target.value === "x>=1200"
    ) {
      // handle logic inside filterRange
      this.filterRange(e.target.value, this.state.users);
    } else {
      // change value of searchable state
      this.setState({
        searchable: {
          isSearch: true,
          searchBy: e.target.value,
        },
      });
    }
  };

  filterRange = (range, dummyState) => {
    console.log(`dummy state - ${dummyState}`);
    let filteredArray;
    switch (range) {
      case "x<500": {
        // filter it
        filteredArray = dummyState.filter(
          (u) => u.score != null && u.score.crs_score < 500
        );
        break;
      }
      case "x>=500ANDx<800": {
        // filter it
        filteredArray = dummyState.filter(
          (u) =>
            u.score != null &&
            u.score.crs_score >= 500 &&
            u.score.crs_score < 500
        );
        break;
      }
      case "x>=800ANDx<1200": {
        // filter it
        filteredArray = dummyState.filter(
          (u) =>
            u.score != null &&
            u.score.crs_score >= 800 &&
            u.score.crs_score < 1200
        );
        break;
      }
      case "x>=1200": {
        // filter it
        filteredArray = dummyState.filter(
          (u) => u.score != null && u.score.crs_score >= 1200
        );
        break;
      }
    }

    // set state with filtered array
    this.setState({
      filteredArray: filteredArray,
    });
  };

  handlebuttonclick = (e) => {
    console.log(e.target.id);
    let clickeduser = this.state.users.filter(
      (user) => user.user_id == e.target.id
    );
    console.log(clickeduser[0]);
    this.props.history.push({
      pathname: "/userinfo",
      state: { user: clickeduser },
    });
  };

  handleSearchChange = (e) => {
    if (this.state.searchable.isSearch) {
      // set main state into dummy state
      let dummyState = this.state;

      // filter it
      let filteredArray = dummyState.users.filter((c) => {
        if (c[`${this.state.searchable.searchBy}`].includes(e.target.value)) {
          return true;
        } else {
          return false;
        }
      });

      // pass the filter array to method
      this.setState({
        filteredArray: filteredArray,
      });
    } else {
      // TODO hanlde with modal
      alert("please select search by");
    }
  };

  componentDidMount() {
    // get token from storage
    let token = sessionStorage.getItem("token");
    if (!token) {
      // redirect 'em to login
      // FIXME use hisory.push
      this.props.history.push("/login");
    }

    // set header object
    let config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    // set axios
    axios
      .get(
        "https://capestone-visto-server.herokuapp.com/api/admin/getAllUsers",
        config
      )
      .then((res) => {
        if (res.data.status === 0) {
          // set state with all the values
          this.setState({ users: res.data.data });
        } else {
          // FIXME modal
        }
      })
      .catch((error) => {
        // FIXME open modal
        console.log(error);
      });
  }

  renderUserItem = (users) => {
    return users.map((c, index) => {
      console.log(c);
      return (
        <ContactItem
          key={c.user_id}
          name={c.first_name}
          id={c.user_id}
          email={c.email}
          country={c.country}
          crs_score={c.score != null ? c.score : null}
          index={index}
          handlebuttonclick={this.handlebuttonclick}
        />
      );
    });
  };

  render() {
    return (
      <>
        <Header />
        <Row
          style={{
            minHeight: "calc(70.3vh)",
          }}
        >
          <Container fluid className="contact-container">
            {/* <Row> */}
            <Row>
              <Col
                style={{
                  marginTop: "7px",
                  marginBottom: "20px",
                  fontSize: "25px",
                  fontFamily: "Times New Roman, Times, serif",
                  color: "black",
                  borderBottom: "1px solid black",
                }}
                xl={{ offset: "0" }}
              >
                Admin DashBoard
              </Col>
            </Row>
            <Col>
              <Search
                onRadioChanged={this.handleRadioChange}
                onTextChanged={this.handleSearchChange}
              />
            </Col>
            {/* </Row> */}

            <Row>
              {this.state.filteredArray
                ? this.renderUserItem(this.state.filteredArray)
                : this.renderUserItem(this.state.users)}
            </Row>
          </Container>
        </Row>
        <Footer />
      </>
    );
  }
}

export default withRouter(Admin);
