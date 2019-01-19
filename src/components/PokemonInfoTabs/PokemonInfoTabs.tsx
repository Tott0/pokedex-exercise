import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokemonInfoTabs.scss";

import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";

import { Pokemon } from "../../models/Pokemon.model";
import StatsTab from "./StatsTab/StatsTab";

interface PropTypes {
  pokemon: Pokemon;
}
class PokemonInfoTabs extends Component<PropTypes> {
  public render() {
    let {pokemon} = this.props;
    pokemon =  pokemon || new Pokemon();
    const stats = pokemon.stats || [];
    return (
      <article className="pokemonInfoTabs">
        <Tabs

        >
        <Tab eventKey="stats" title="Stats">
          <StatsTab stats={stats}/>
        </Tab>
        <Tab eventKey="abilities" title="Abilities">
          <h1>Abilities</h1>
        </Tab>
        <Tab eventKey="typeEffectiveness" title="Type Effectiveness">
          <h1>Effectiveness</h1>
        </Tab>

        </Tabs>
      </article>
    );
  }

  async componentDidMount() {
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PokemonInfoTabs);
