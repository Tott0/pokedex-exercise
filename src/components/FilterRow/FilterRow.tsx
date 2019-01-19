import { connect } from "react-redux";
import React, { Component } from "react";

import "./FilterRow.scss";

import { Col, Container, Form, Row } from "react-bootstrap";
// import Color from "./Color/Color";
// import SelectColor from "./Color/SelectColor";

import { store } from "../..";
import { fetchColorsIfNeeded } from "../../actions";

import { ThunkDispatch } from "redux-thunk";

interface PropTypes {
  colors?: any[];
}
class FilterRow extends Component<PropTypes> {
  colors: any;
  public render() {
    return (
      <section className="filterRow">
        <Container>
          <Form.Row>
            <Col xs={12} sm={6} md={3}>
              <Form.Group>
                <Form.Label>Filter by type...</Form.Label>
                <Form.Control as="select" />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Group>
                <Form.Label>Sort...</Form.Label>
                <Form.Control as="select">
                  <option>By number (asc)</option>
                  <option>By number (desc)</option>
                  <option>By name (asc)</option>
                  <option>By name (desc)</option>
                </Form.Control>
              </Form.Group>
              </Col>
          </Form.Row>
        </Container>
      </section>
    );
  }

  async componentDidMount() {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(fetchColorsIfNeeded());
  }
}

function mapStateToProps(state: any) {
  return {
  };
}

export default connect(mapStateToProps)(FilterRow);
