import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Pokemon, Ability, Type } from "../models/Pokemon.model";
import { updatePokemonsCache } from "./getPokemons";
export const REQUEST_POKEMON = "REQUEST_POKEMON";
export function requestPokemon(url: string) {
  return {
    type: REQUEST_POKEMON,
    url
  };
}
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export function receivePokemon(pokemon: Pokemon) {
  return {
    type: RECEIVE_POKEMON,
    pokemon: pokemon,
    receivedAt: Date.now()
  };
}

function fetchPokemonApi(url: string): Promise<Pokemon>{
  return axios.get<any>(url)
  .then(res => {
    console.log(res);
    const data = res.data;
    const pokemon = new Pokemon({
      id: ("00" + data.id).slice(-3),
      name: data.name,
      url: url,
      img: data.sprites.front_default,
      types: data.types.map((tp: any) => new Type({name: tp.type.name, url: tp.type.url})),
      stats: data.stats.map((st: any) => st.base_stat),
      abilities: data.abilities.map((a: Ability) => new Ability({name: a.name, url: a.url}))
    });
    return Promise.resolve(pokemon);
  })
  .catch(err => {
    console.error(err)
    return Promise.reject();
  });
}

function fetchAllPokemons(index: number, pokemons: Pokemon[]) {
  if(index > pokemons.length){
    return (dispatch: ThunkDispatch<{}, {}, any>) => {};
  }
  const pokemon = pokemons[index];
  if(!pokemon){
    return (dispatch: ThunkDispatch<{}, {}, any>) => {};
  }
  const url = pokemon.url
  if(!url || pokemon.id){
    return (dispatch: ThunkDispatch<{}, {}, any>) => {};
  }
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(requestPokemon(url))
    return fetchPokemonApi(url)
      .then((pokemon: Pokemon) => {
        updatePokemonsCache(pokemon);
        dispatch(receivePokemon(pokemon))
      })
      .then(() => dispatch(fetchAllPokemons(++index, pokemons)))
  }
}

export function fetchAllPokemonDetails(pokemons: Pokemon[]){
  console.log('fetchall')
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
      return dispatch(fetchAllPokemons(0, pokemons));
  };
}
