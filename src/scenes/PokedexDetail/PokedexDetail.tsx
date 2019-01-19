import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokedexDetail.scss";

import { RouteComponentProps } from "react-router-dom";
import { store } from "../..";
import { ThunkDispatch } from "redux-thunk";
import { getPokemonByName } from "../../actions";
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
            <Col xs={8} sm={6} lg={3}>
              <PokemonCard pokemon={this.props.pokemon} />
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
  const { getPokemons } = state;
  return {
    pokemon: getPokemons.pokemon
  };
}

export default connect(mapStateToProps)(PokedexDetail);
