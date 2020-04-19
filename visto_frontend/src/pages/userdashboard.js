import React, { useReducer } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserDashboardMainPage from "../components/userdashboard";
class UserDashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        {/* <h3>Hello</h3> */}
        <Header />
        <UserDashboardMainPage />
        {/* <Footer /> */}
      </>
    );
  }
}

export default UserDashboard;
