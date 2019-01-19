import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Type } from "../models/Pokemon.model";
import { getFilteredPokemons } from "./getPokemons";

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
    dispatch(getFilteredPokemons(selectedType));
    dispatch({
      type: SELECT_POKEMON_TYPE,
      selectedType
    });
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
