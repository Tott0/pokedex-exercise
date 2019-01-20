import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokedexIndex.scss";

import { Alert } from "react-bootstrap";

import FilterRow from "../../components/FilterRow/FilterRow";
import Pokedex from "../../components/Pokedex/Pokedex";

interface PropTypes {
  allPokemonsLoaded?: boolean;
}
class PokedexIndex extends Component<PropTypes> {
  public render() {
    const { allPokemonsLoaded } = this.props;
    return (
      <div className="pokedexIndex">
        {!allPokemonsLoaded && (
          <Alert variant="warning" className="text-center">
          <i className="mr-3 fas fa-circle-notch fa-spin" />
          ...
            <span>Cargando datos de la API</span>
            ...
            <i className="ml-3 fas fa-circle-notch fa-spin" />
          </Alert>
        )}
        <FilterRow />
        <Pokedex />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { getPokemons } = state;
  return {
    allPokemonsLoaded: getPokemons.allPokemonsLoaded
  };
}

export default connect(mapStateToProps)(PokedexIndex);
