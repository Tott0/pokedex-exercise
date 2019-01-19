import { connect } from "react-redux";
import React, { Component } from "react";

import "./Pokedex.scss";

import {
  Container} from "react-bootstrap";

import { store } from "../..";
import { fetchPokemonsIfNeeded, fetchAllPokemonDetails } from "../../actions";

import { ThunkDispatch } from "redux-thunk";

import PokemonCard from "./Pokemon/PokemonCard";
import { Pokemon } from "../../models/Pokemon.model";

interface PropTypes {
  pokemons?: Pokemon[];
}
class Pokedex extends Component<PropTypes> {
  public render() {
    const { pokemons } = this.props;
    return (
      <section className="pokedex">
        <Container>
          <div className="wrapper">
          {
              pokemons &&
              pokemons.map((pokemon: Pokemon, index: number) => (
              <PokemonCard key={pokemon.id || pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  async componentDidMount() {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(fetchPokemonsIfNeeded());
  }
}

function mapStateToProps(state: any) {
  const { getPokemons } = state;
  const pokemons = getPokemons.pokemons.slice(0, 25);
  return {
    pokemons: pokemons
  };
}

export default connect(mapStateToProps)(Pokedex);
