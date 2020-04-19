import React from "react";
import UpdateForeignEdu from "../../components/update/foreign_edu_update";
class CadForeignEduUpdate extends React.Component {
  componentDidMount() {
    let usertoken = sessionStorage.getItem("token");
    fetch(
      "https://capestone-visto-server.herokuapp.com/api/canadian-education",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": usertoken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // this.setState({ data });
      });
  }

  render() {
    return (
      <>
        <UpdateForeignEdu />
      </>
    );
  }
}

export default CadForeignEduUpdate;
