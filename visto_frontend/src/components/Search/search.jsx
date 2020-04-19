import React from "react";

// BOOTSTRAP
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// CSSs
import "./search.css";

const Search = (props) => {
  return (
    // <Row style={{ width: "40%", margin: "auto" }}>
    <Col style={{ display: "flex" }}>
      <Col xl={{ offset: "4", span: 3 }}>
        <Form style={{ display: "flex" }}>
          <Form.Control
            className="input-search"
            type="search"
            placeholder="search by"
            onChange={props.onTextChanged}
          />
        </Form>
      </Col>
      <Col xl={{ span: 1 }}>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                value="first_name"
                onChange={props.onRadioChanged}
              />
              Name
            </div>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios2"
                value="email"
                onChange={props.onRadioChanged}
              />
              Email
            </div>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="x<500"
                onChange={props.onRadioChanged}
              />
              score&lt;500
            </div>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="x>=500ANDx<800"
                onChange={props.onRadioChanged}
              />
              score&ge;500 AND score&lt;800
            </div>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="x>=800ANDx<1200"
                onChange={props.onRadioChanged}
              />
              score&ge;800 AND score&lt;1200
            </div>
            <div class="radio-input">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="x>=1200"
                onChange={props.onRadioChanged}
              />
              score&ge;1200
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Col>
    // </Row>
  );
};

export default Search;
