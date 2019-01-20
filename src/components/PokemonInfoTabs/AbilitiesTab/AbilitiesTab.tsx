import { connect } from "react-redux";
import React, { Component } from "react";

import "./AbilitiesTab.scss";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Ability, Pokemon } from "../../../models/Pokemon.model";
import { store } from "../../..";
import { ThunkDispatch } from "redux-thunk";
import { fetchAllAbilityDetails } from "../../../actions/pokemonAbilities";

interface PropTypes {
  pokemon: Pokemon;
}
class AbilitiesTab extends Component<PropTypes> {
  public render() {
    const abilities = this.props.pokemon.abilities;
    return (
      <div className="tabWrapper abilitiesTab">
        {
          abilities && abilities.length > 0 && 
        abilities.map((ability: Ability, index: number) => (
          <div className="ability" key={index.toString()}>
            <span className="name">{ability.name}</span>
            <p>{ability.shortEffect}</p>
          </div>
        ))
        }
      </div>
    );
  }

  componentDidMount() {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(fetchAllAbilityDetails(this.props.pokemon));
  }
}

function mapStateToProps() {
  return {};
}

export default (AbilitiesTab);
