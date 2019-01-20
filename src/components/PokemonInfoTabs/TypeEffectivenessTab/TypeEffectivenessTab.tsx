import React, { Component } from "react";

import "./TypeEffectivenessTab.scss";

import { Col, Row } from "react-bootstrap";
import { Pokemon } from "../../../models/Pokemon.model";
import { getTypesArray } from "../../../actions";

interface PropTypes {
  pokemon: Pokemon;
}
class TypeEffectivenessTab extends Component<PropTypes> {
  getColorStyle(dmg: number) {
    let color: string;
    switch (dmg) {
      case 0:
        color = "#3b3d4d";
        break;
      case 25:
        color = "#417505";
        break;
      case 50:
        color = "#69ae1c";
        break;
      default:
      case 100:
        color = "#a29812";
        break;
      case 200:
        color = "#f59023";
        break;
      case 400:
        color = "#d0021b";
        break;
    }
    return {
      color: color
    };
  }
  public render() {
    const types = this.props.pokemon.types || [];
    let dmgArray1 = types[0] && types[0].damageRelations;
    let dmgArray2 = types[1] && types[1].damageRelations;

    let dmgArray = Array(20).fill(100);
    if (dmgArray1 && dmgArray1.length > 0) {
      dmgArray = dmgArray1.map((dmg, index) => {
        return dmgArray[index] * dmg;
      });
    }
    if (dmgArray2 && dmgArray2.length > 0) {
      dmgArray = dmgArray2.map((dmg, index) => {
        return dmgArray[index] * dmg;
      });
    }

    const typesArray = getTypesArray();

    return (
      <div className="tabWrapper typeEffectivenessTab">
        <Row noGutters>
          {dmgArray.map((dmg: number, index: number) => (
            <Col xs={6} sm={4} xl={3} key={`${index}`}>
              <span className="eff" style={this.getColorStyle(dmg)}>
                {typesArray[index].name}: {dmg}%
              </span>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  componentDidMount() {
  }
}


export default TypeEffectivenessTab;
