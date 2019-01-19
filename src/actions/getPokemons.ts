import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Pokemon, Type } from "../models/Pokemon.model";
import { fetchAllPokemonDetails } from "./pokemonDetails";
export const REQUEST_POKEMONS = "REQUEST_POKEMONS";
export function requestPokemons() {
  return {
    type: REQUEST_POKEMONS,
  };
}

export const RECEIVE_POKEMONS = "RECEIVE_POKEMONS";
export function receivePokemons(pokemons: any[]) {
  return {
    type: RECEIVE_POKEMONS,
    pokemons: pokemons,
    receivedAt: Date.now()
  };
}

export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
function filterByType(pokemons: Pokemon[]){
  return { 
    type: FILTER_BY_TYPE,
    pokemons: pokemons
  }
}

export function getFilteredPokemons(selectedType: Type){
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return fetchPokemonsApi()
    .then((pokemons: Pokemon[]) => {
      const filteredPokemons = pokemons.filter((pokemon: Pokemon) => {
        if (pokemon.types) {
          return pokemon.types.some(
            type => type.name === selectedType.name
          );
        }
        return false;
      });
      dispatch(filterByType(filteredPokemons))
      return Promise.resolve(filteredPokemons);
    })
  }
}

var pokemonsCache: Pokemon[];
function fetchPokemonsApi(){
  return axios.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=949`)
  .then(res => {
    // console.log(res);
    if(pokemonsCache){
      return Promise.resolve(pokemonsCache);
    }
    const data = res.data;
    const pokemons = data.results.map((r: Pokemon) => new Pokemon(r));
    pokemonsCache = pokemons;
    // console.log(pokemons);
    return Promise.resolve(pokemons);
  })
  .catch(err => console.error(err));
}

export function updatePokemonsCache(pokemon: Pokemon){
  const index = pokemonsCache.findIndex(p => p.name === pokemon.name)
  pokemonsCache[index] = pokemon;
}

function fetchPokemons() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(requestPokemons())
    return fetchPokemonsApi()
    .then((pokemons: Pokemon[]) => {
      dispatch(receivePokemons(pokemons))
      return Promise.resolve(pokemons);
    })
    .then((pokemons: Pokemon[]) => dispatch(fetchAllPokemonDetails(pokemons)))
  }
}

function shouldFetchPokemons(state: any) {
  const {pokemons} = state;
  if (!pokemons || pokemons.length <= 0) {
    return true;
  } else {
    return false;
  }
}

export function fetchPokemonsIfNeeded(): (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => any {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    if (shouldFetchPokemons(getState())) {
      return dispatch(fetchPokemons());
    }
  };
}
