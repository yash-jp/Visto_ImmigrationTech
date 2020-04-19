import React from "react";
import YesComponent from "../yescomponent";
import NoComponent from "../nocomponent";

function loadComponent(props) {
  if (!props.selected) {
    return <NoComponent></NoComponent>;
  }
  return <YesComponent></YesComponent>;
}

export default loadComponent;
