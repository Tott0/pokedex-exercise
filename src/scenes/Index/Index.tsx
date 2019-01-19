import React, { Component } from "react";

import "./Index.scss";

import FilterRow from "../../components/FilterRow/FilterRow";

class Index extends Component {
  public render() {
    return (
      <div className="index">
        <FilterRow />
      </div>
    );
  }
}

export default Index;
