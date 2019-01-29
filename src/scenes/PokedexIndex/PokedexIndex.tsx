import { connect } from "react-redux";
import React, { Component } from "react";

import "./PokedexIndex.scss";

import { Alert } from "react-bootstrap";

import FilterRow from "../../components/FilterRow/FilterRow";
import Pokedex from "../../components/Pokedex/Pokedex";
import { RouteComponentProps } from "react-router";
import { selectPage } from "../../actions";
import { ThunkDispatch } from "redux-thunk";
import { store } from "../..";

import queryString from "query-string";
import PokemonPaginator from "../../components/Pokedex/PokemonPaginator/PokemonPaginator";

interface RouteParams {
  page?: string;
}
interface PropTypes extends RouteComponentProps<RouteParams> {
  allPokemonsLoaded?: boolean;
  paginatorPage?: number;
}
class PokedexIndex extends Component<PropTypes> {
  public render() {
    const { allPokemonsLoaded } = this.props;
    return (
      <div className="pokedexIndex">
        {!allPokemonsLoaded && (
          <Alert variant="warning" className="text-center">
            <i className="mr-3 fas fa-circle-notch fa-spin" />
            <span>...Cargando datos de la API...</span>
            <i className="ml-3 fas fa-circle-notch fa-spin" />
          </Alert>
        )}
        <FilterRow />
        <Pokedex />
        <PokemonPaginator />
      </div>
    );
  }

  componentDidMount(){
    const queryParams = queryString.parse(this.props.location.search);
    if(queryParams){
      const page = +`${queryParams.page}` > 0 ? +`${queryParams.page}` : 1;
      const oldPage = this.props.paginatorPage || 0;
      if(oldPage !== page){
        (store.dispatch as ThunkDispatch<{}, {}, any>)(
          selectPage(page)
        );
      }
    }
  }

  componentWillReceiveProps(newProps: PropTypes){
    const queryParams = queryString.parse(newProps.location.search);
    if(queryParams){
      const page = +(queryParams.page || 1);
      const oldPage = +(newProps.paginatorPage || 1);
      if(oldPage !== page){
        (store.dispatch as ThunkDispatch<{}, {}, any>)(
          selectPage(page)
        );
      }
    }
  }
}

function mapStateToProps(state: any) {
  const { page, allPokemonsLoaded} = state.getPokemons; 
  return {
    allPokemonsLoaded,
    paginatorPage: page
  };
}

export default connect(mapStateToProps)(PokedexIndex);
