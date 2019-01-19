import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Type } from "../models/Pokemon.model";
import { fetchPokemons, searchPokemons } from "./getPokemons";

export const REQUEST_TYPES = "REQUEST_TYPES";
export function requestTypes() {
  return {
    type: REQUEST_TYPES
  };
}

export const RECEIVE_TYPES = "RECEIVE_TYPES";
export function receiveTypes(types: Type[]) {
  return {
    type: RECEIVE_TYPES,
    types: types,
    receivedAt: Date.now()
  };
}

export const SELECT_POKEMON_TYPE = "SELECT_POKEMON_TYPE";
export function selectPokemonType(selectedType: Type) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: SELECT_POKEMON_TYPE,
      selectedType
    });
    dispatch(fetchPokemons());
  };
}

export const NUMBER_ASC = "NUMBER_ASC";
export const NUMBER_DSC = "NUMBER_DSC";
export const NAME_ASC = "NAME_ASC";
export const NAME_DSC = "NAME_DSC";
export const SORT_POKEMONS_BY = "SORT_POKEMONS_BY";
export function sortPokemonsBy(sortedBy: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: SORT_POKEMONS_BY,
      sortedBy
    });
    dispatch(fetchPokemons());
  };
}

export const FILTER_POKEMONS_NAME = "FILTER_POKEMONS_NAME";
export function filterPokemonsByName(filterName: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: FILTER_POKEMONS_NAME,
      filterName
    });
    dispatch(searchPokemons());
  };
}

function fetchTypesApi() {
  return axios
    .get<any>(`https://pokeapi.co/api/v2/type/`)
    .then(res => {
      // console.log(res);
      const data = res.data;
      const types = data.results.map((r: Type) => new Type(r));
      // console.log(types);
      return Promise.resolve(types);
    })
    .catch(err => console.error(err));
}

function fetchTypes() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(requestTypes());
    return fetchTypesApi().then((types: Type[]) => {
      dispatch(receiveTypes(types));
      return Promise.resolve(types);
    });
  };
}

function shouldFetchTypes(state: any) {
  const { types } = state;
  if (!types || types.length <= 0) {
    return true;
  } else {
    return false;
  }
}

export function fetchTypesIfNeeded(): (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: any
) => any {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    if (shouldFetchTypes(getState())) {
      return dispatch(fetchTypes());
    }
  };
}
