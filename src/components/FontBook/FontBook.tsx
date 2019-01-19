import React, { Component } from "react";

import "./FontBook.scss";

import { Col, Container, Row } from "react-bootstrap";
import Font from "./Font/Font";
import ColoredFont from "./Font/ColoredFont";

class FontBook extends Component {
  public render() {
    return (
      <section className="fontBook">
        <Container>
          <h3 className="sectionTitle">FontBook </h3>
          <Row>
            <ColoredFont title="Large title" fontWeight={100} fontSize={42} />
            <ColoredFont title="Normal" fontWeight={400} fontSize={24} />
          </Row>
          <Row>
            <ColoredFont title="Title" fontWeight={300} fontSize={32} />
            <ColoredFont title="Description" fontWeight={500} fontSize={22} />
          </Row>
        </Container>
      </section>
    );
  }
}

export default FontBook;
