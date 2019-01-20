import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokedexDetail.scss";

import { RouteComponentProps } from "react-router-dom";
import { store } from "../..";
import { ThunkDispatch } from "redux-thunk";
import { getPokemonByName, getTypesArray } from "../../actions";
import PokemonCard from "../../components/Pokedex/Pokemon/PokemonCard";
import { Pokemon } from "../../models/Pokemon.model";

import { Col, Container, Row } from "react-bootstrap";
import PokemonInfoTabs from "../../components/PokemonInfoTabs/PokemonInfoTabs";

interface RouteParams {
  name: string;
}
interface DetailProps extends RouteComponentProps<RouteParams> {
  pokemon: Pokemon;
}
class PokedexDetail extends Component<DetailProps> {
  public render() {
    return (
      <section className="pokedexDetail">
        <Container>
          <Row>
            <Col xs={12} sm={12} lg={3}>
              <PokemonCard noLink pokemon={this.props.pokemon} />
            </Col>
            <Col xs={12} sm={12} lg={9}>
            <PokemonInfoTabs pokemon={this.props.pokemon}/>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  componentDidMount() {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(
      getPokemonByName(this.props.match.params.name)
    );
  }
}

function mapStateToProps(state: any) {
  const { getPokemons, getTypes } = state; 
  const pokemon: Pokemon = getPokemons.pokemon;
  if(pokemon){
    if(pokemon.types && pokemon.types.length > 0){
      if(!pokemon.types[0].id){
        const typesArray = getTypesArray();
        pokemon.types = pokemon.types.map(
          (type: any) => {
            const fType = typesArray.find(tp => ("" + tp.name).toLowerCase() === type.name.toLowerCase());
            return fType || type
          }
        )
      }
    }
  }
  return {
    pokemon: pokemon
  };
}

export default connect(mapStateToProps)(PokedexDetail);
