import React, { Component } from "react";

import "./PokedexIndex.scss";

import FilterRow from "../../components/FilterRow/FilterRow";
import Pokedex from "../../components/Pokedex/Pokedex";

class PokedexIndex extends Component {
  public render() {
    return (
      <div className="pokedexIndex">
        <FilterRow />
        <Pokedex />
      </div>
    );
  }
}

export default PokedexIndex;
