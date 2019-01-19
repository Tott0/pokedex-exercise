import React, { Component } from "react";

import "./Index.scss";

import FilterRow from "../../components/FilterRow/FilterRow";
import Pokedex from "../../components/Pokedex/Pokedex";

class Index extends Component {
  public render() {
    return (
      <div className="index">
        <FilterRow />
        <Pokedex />
      </div>
    );
  }
}

export default Index;
