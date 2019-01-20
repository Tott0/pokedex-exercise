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
import AbilitiesTab from "./AbilitiesTab/AbilitiesTab";
import TypeEffectivenessTab from "./TypeEffectivenessTab/TypeEffectivenessTab";

interface PropTypes {
  pokemon: Pokemon;
}
class PokemonInfoTabs extends Component<PropTypes> {
  public render() {
    let {pokemon} = this.props;
    pokemon =  pokemon || new Pokemon();
    const abilities = pokemon.abilities || [];
    const types = pokemon.abilities || [];
    const stats = pokemon.stats || [];
    return (
      <article className="pokemonInfoTabs">
        <Tabs

        >
        <Tab eventKey="stats" title="Stats">
          <StatsTab stats={stats}/>
        </Tab>
        <Tab eventKey="abilities" title="Abilities">
        {
          abilities.length > 0 &&
          <AbilitiesTab pokemon={pokemon}/>
        }
        </Tab>
        <Tab eventKey="typeEffectiveness" title="Type Effectiveness">
        {
          types.length > 0 &&
          <TypeEffectivenessTab pokemon={pokemon}/>
        }
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

export default (PokemonInfoTabs);
