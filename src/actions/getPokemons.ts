import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Pokemon, Type } from "../models/Pokemon.model";
import { fetchAllPokemonDetails, fetchPokemonApi } from "./pokemonDetails";
import { NUMBER_ASC, NUMBER_DSC, NAME_ASC, NAME_DSC } from "./pokemonTypes";
import { fetchAllAbilityDetails } from "./pokemonAbilities";
export const REQUEST_POKEMONS = "REQUEST_POKEMONS";
function requestPokemons() {
  return {
    type: REQUEST_POKEMONS
  };
}

export const RECEIVE_POKEMONS = "RECEIVE_POKEMONS";
function receivePokemons(pokemons: any[]) {
  return {
    type: RECEIVE_POKEMONS,
    pokemons: pokemons,
    receivedAt: Date.now()
  };
}

export const RECEIVE_SEARCHED_POKEMONS = "RECEIVE_SEARCHED_POKEMONS";
function receiveSearchedPokemons(pokemons: any[]) {
  return {
    type: RECEIVE_SEARCHED_POKEMONS,
    searchedPokemons: pokemons
  };
}

export const RECEIVE_POKEMON_BY_NAME = "RECEIVE_POKEMON_BY_NAME";
function receivePokemonByName(pokemon: Pokemon) {
  return {
    type: RECEIVE_POKEMON_BY_NAME,
    pokemon: pokemon
  };
}

export function getPokemonByName(name: string) {
  // console.log(name);
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    return fetchPokemonsApi()
      .then((pokemons: Pokemon[]) => {
        const pokemon = pokemons.find((p: Pokemon) => {
          return p.name === name;
        });
        if(pokemon){
          if (pokemon.id) {
            return Promise.resolve(pokemon);
          }
          if(pokemon.url){
            return Promise.resolve(fetchPokemonApi(pokemon.url));
          }
        }
        return Promise.reject("NO POKEMON");
      })
      .then((pokemon: Pokemon) => {
        dispatch(fetchAllAbilityDetails(pokemon))
        return pokemon;
      })
      .then((pokemon: Pokemon) => {
        console.log(pokemon);
        if (pokemon.id) {
          dispatch(receivePokemonByName(pokemon));
        }
      });
  };
}

function sortPokemons(sortedBy: string, p: Pokemon[]): Promise<Pokemon[]> {
  return Promise.resolve(p).then(pokemons => {
    return Promise.resolve(
      pokemons.sort((a: Pokemon, b: Pokemon) => {
        switch (sortedBy) {
          case NUMBER_ASC:
            return +("" + a.id) < +("" + b.id) ? -1 : 1;
          case NUMBER_DSC:
            return +("" + a.id) < +("" + b.id) ? 1 : -1;
          case NAME_ASC:
            return "" + a.name < "" + b.name ? -1 : 1;
          case NAME_DSC:
            return "" + a.name < "" + b.name ? 1 : -1;
        }
        return 0;
      })
    );
  });
}

function filterPokemons(selectedType: Type, p: Pokemon[]): Promise<Pokemon[]> {
  return Promise.resolve(p).then(pokemons => {
    return pokemons.filter((pokemon: Pokemon) => {
      if (pokemon.types) {
        return pokemon.types.some(type => type.name === selectedType.name);
      }
      return false;
    });
  });
}

var pokemonsCache: Pokemon[];
export function fetchPokemonsApi() {
  if (pokemonsCache) {
    return Promise.resolve(pokemonsCache);
  }
  return axios
    .get<any>(`https://pokeapi.co/api/v2/pokemon?limit=949`)
    .then(res => {   
      const data = res.data;
      const pokemons = data.results.map((r: Pokemon) => new Pokemon(r));
      pokemonsCache = pokemons;
      return Promise.resolve(pokemons);
    })
    .catch(err => console.error(err));
}

export function updatePokemonsCache(pokemon: Pokemon) {
  const index = pokemonsCache.findIndex(p => p.name === pokemon.name);
  pokemonsCache[index] = pokemon;
}

export function fetchPokemons() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    const { sortedBy, selectedType } = getState().getTypes;
    dispatch(requestPokemons());
    return fetchPokemonsApi()
      .then((pokemons: Pokemon[]) => {
        // sort pokemons
        if (sortedBy) {
          return Promise.resolve(sortPokemons(sortedBy, pokemons));
        }
        return Promise.resolve(pokemons);
      })
      .then((pokemons: Pokemon[]) => {
        // filter pokemons
        if (selectedType) {
          return Promise.resolve(filterPokemons(selectedType, pokemons));
        }
        return Promise.resolve(pokemons);
      })
      .then((pokemons: Pokemon[]) => {
        dispatch(receivePokemons(pokemons));
        return Promise.resolve(pokemons);
      })
      .then((pokemons: Pokemon[]) => {
        if(!getState().getPokemons.loadingPokemons){
          // console.log(getState());
          dispatch(fetchAllPokemonDetails(pokemons))
        }
      }
      );
  };
}

export function searchPokemons() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    let { filterName } = getState().getTypes;
    filterName = filterName ? filterName : "";
    dispatch(requestPokemons());
    return fetchPokemonsApi().then((pokemons: Pokemon[]) => {
      let filteredByName: Pokemon[] = [];
      if(filterName){
        filteredByName = pokemons.filter((pokemon: Pokemon) => {
          const name = ("" + pokemon.name).toLowerCase();
          return name.startsWith(filterName.toLowerCase());
        });
      }
      dispatch(receiveSearchedPokemons(filteredByName));
    });
  };
}
