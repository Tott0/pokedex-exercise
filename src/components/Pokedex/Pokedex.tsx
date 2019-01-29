import { connect } from "react-redux";
import React, { Component } from "react";

import "./Pokedex.scss";

import { Container } from "react-bootstrap";

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
            {pokemons &&
              pokemons.map((pokemon: Pokemon) => (
                <PokemonCard
                  key={pokemon.id || pokemon.name}
                  pokemon={pokemon}
                />
              ))}
          </div>
        </Container>
      </section>
    );
  }
}

function mapStateToProps(state: any) {
  const { getPokemons } = state;
  const { page, totalPokemons, pokemons } = getPokemons;
  return {
    page,
    totalPokemons,
    pokemons
  };
}

export default connect(mapStateToProps)(Pokedex);
