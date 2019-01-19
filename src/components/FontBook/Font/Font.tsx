import React, { Component } from "react";

import "./Font.scss";

import { Col, Container, Row } from "react-bootstrap";
import { store } from "../../../index";

interface FontProps {
  title: string;
  fontWeight: number;
  fontSize: number;
  rgb: string;
}
class Font extends Component<FontProps> {
  fontStyle = () => ({
    fontWeight: this.props.fontWeight,
    fontSize: `${this.props.fontSize}px`,
    color: `rgba(${this.props.rgb})`
  })
  descStyle = () =>({
    color: `rgba(${this.props.rgb})`
  });

  public render() {
    return (
      <Col className="font">
        <span className="title" style={this.fontStyle()}>{this.props.title}</span>
        <span className="desc" style={this.descStyle()}>{this.props.fontSize}px; font-weight: {this.props.fontWeight}</span>
      </Col>
    );
  }
}

export default Font;
