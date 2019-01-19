import React, { Component } from "react";

import "./Color.scss";

import { Col, Row } from "react-bootstrap";
import FlexFiller from "../../FlexFiller/FlexFiller";

import classNames from "classnames";

interface ColorProps {
  color: {
    name: string;
    hex: string;
    rgb: string;
  };
  selected: boolean;
  onClick: () => any;
}
class Color extends Component<ColorProps> {
  previewStyle = {
    backgroundColor: `rgba(${this.props.color.rgb})`
  };

  public render() {
    return (
      <Row
        className={classNames("color", { selected: this.props.selected })}
        noGutters
        onClick={this.props.onClick}
      >
        <Col className="colorPreview" xs="auto" style={this.previewStyle} />
        <Col className="colorInfo">
          <p className="name">{this.props.color.name}</p>
          <FlexFiller noMin />
          <p>{this.props.color.hex}</p>
          <p>{this.props.color.rgb}</p>
        </Col>
      </Row>
    );
  }
}

export default Color;
