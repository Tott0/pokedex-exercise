import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokemonCard.scss";

import {
  Col,
  Container,
  Row
} from "react-bootstrap";

import { Pokemon } from "../../../models/Pokemon.model";

interface PropTypes {
  pokemon: Pokemon;
}
class PokemonCard extends Component<PropTypes> {
  public render() {
    let {pokemon} = this.props;
    pokemon =  pokemon || new Pokemon();
    return (
      <article className="pokemonCard">
        <Container fluid>
          <Row className="info" noGutters>
            <Col>
            <img src={pokemon.img}></img>
            </Col>
            <Col>
              <Row noGutters>
                <span className="name">{pokemon.name}</span>
              </Row>
              <Row noGutters>
              <span className="id">#{pokemon.id && pokemon.id < 999 ? ("00" + pokemon.id).slice(-3): pokemon.id}</span>
              </Row>
            </Col>
          </Row>
          <Row className="types" noGutters>
            <Col><p>{pokemon.types && pokemon.types[0] && pokemon.types[0].name}</p></Col>
            <Col><p>{pokemon.types && pokemon.types[1] && pokemon.types[1].name}</p></Col>
          </Row>
        </Container>
      </article>
    );
  }
}

export default (PokemonCard);
