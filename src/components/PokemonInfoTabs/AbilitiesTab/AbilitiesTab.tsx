import React, { Component } from "react";

import "./AbilitiesTab.scss";

import { Ability, Pokemon } from "../../../models/Pokemon.model";

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
  }
}


export default (AbilitiesTab);
