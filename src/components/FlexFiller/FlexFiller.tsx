import React, { Component } from "react";

import "./FlexFiller.scss";

interface PropTypes {
  noMin?: boolean;
}
class FlexFiller extends Component<PropTypes> {
  public render() {
    return this.props.noMin ? (
      <div className="flex-filler no-min"/>
    ) : (
      <div className="flex-filler">{this.props.children}</div>
    );
  }
}

export default FlexFiller;
