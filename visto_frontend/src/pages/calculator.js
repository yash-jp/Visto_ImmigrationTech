import React from "react";
import CalculatorPage from "../components/calculatorcomponent/calculator/marital";
import { Row, Col } from "react-bootstrap";
import Header from "../components/header";
import { withRouter } from "react-router-dom";
import Footer from "../components/footer";
class Calculator extends React.Component {
  state = {
    loggedIn: "",
  };

  componentDidMount() {
    if (sessionStorage.getItem("LoggedIn") !== "false") {
      this.setState({ loggedIn: "true" });
    } else {
      this.setState({ loggedIn: "false" });
    }
  }

  render() {
    return (
      <>
        <Header />

        {/* FIXME Change background color */}
        <Row
          style={{
            backgroundColor: "lightblue",
            minHeight: "calc(67.5vh)",
          }}
        >
          <Col
            className="center calc"
            lg={5}
            md={8}
            sm={10}
            xs={10}
            style={{ border: "1px solid black", boxShadow: "3px 3px black" }}
          >
            {this.state.loggedIn != ""
              ? [
                  this.state.loggedIn != "false" ? (
                    <div
                      style={{
                        marginLeft: "0px",
                        minHeight: "55vh",
                      }}
                    >
                      <CalculatorPage />
                    </div>
                  ) : (
                    this.props.history.push("/login")
                  ),
                ]
              : null}
          </Col>
        </Row>

        <Footer />
      </>
    );
  }
}

export default withRouter(Calculator);
