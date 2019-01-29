import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Pokemon, Type } from "../models/Pokemon.model";
import { fetchAllPokemonDetails, fetchPokemonApi } from "./pokemonDetails";
import {
  NUMBER_ASC,
  NUMBER_DSC,
  NAME_ASC,
  NAME_DSC,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  RECEIVE_SEARCHED_POKEMONS,
  RECEIVE_POKEMON_BY_NAME,
  POKEMONS_PER_PAGE,
  SELECT_PAGE,
  DEFAULT_POKEMON_FETCH,
  TYPE_POKEMON_FETCH,
  SET_POKEMONS_SOURCE
} from "../constants";
import { fetchAllAbilityDetails } from "./pokemonAbilities";
import { fetchTypeDetailsApi, getPokemonsFromTypeApi } from "./pokemonTypes";

function requestPokemons(page?: number) {
  return {
    type: REQUEST_POKEMONS,
    page
  };
}

export function setPokemonsSource(pokemonsSource: string) {
  return {
    type: SET_POKEMONS_SOURCE,
    pokemonsSource
  };
}

function receivePokemons(
  pokemons: any[],
  totalPokemons: number,
  pokemonsSource = DEFAULT_POKEMON_FETCH
) {
  return {
    type: RECEIVE_POKEMONS,
    pokemons,
    totalPokemons,
    pokemonsSource,
    receivedAt: Date.now()
  };
}

function receiveSearchedPokemons(pokemons: any[]) {
  return {
    type: RECEIVE_SEARCHED_POKEMONS,
    searchedPokemons: pokemons
  };
}

function receivePokemonByName(pokemon: Pokemon) {
  return {
    type: RECEIVE_POKEMON_BY_NAME,
    pokemon: pokemon
  };
}

export function selectPage(page: number) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: SELECT_PAGE,
      page
    });
    const { pokemonsSource } = getState().getPokemons;
    switch (pokemonsSource) {
      case DEFAULT_POKEMON_FETCH:
        dispatch(fetchPokemons());
        break;
      case TYPE_POKEMON_FETCH:
        dispatch(fetchPokemonsFromType());
        break;
    }
  };
}

export function getPokemonByName(name: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    return fetchPokemonsApi()
      .then((pokemons: Pokemon[]) => {
        const pokemon = pokemons.find((p: Pokemon) => {
          return p.name === name;
        });
        if (pokemon) {
          if (pokemon.id) {
            return Promise.resolve(pokemon);
          }
          if (pokemon.url) {
            return Promise.resolve(fetchPokemonApi(pokemon.url));
          }
        }
        return Promise.reject("NO POKEMON");
      })
      .then((pokemon: Pokemon) => {
        dispatch(fetchAllAbilityDetails(pokemon));
        return pokemon;
      })
      .then((pokemon: Pokemon) => {
        if (pokemon.id) {
          dispatch(receivePokemonByName(pokemon));
        }
      });
  };
}

var pokemonsCache: Pokemon[];
export function updatePokemonsCache(pokemon: Pokemon) {
  const index = pokemonsCache.findIndex(p => p.name === pokemon.name);
  pokemonsCache[index] = pokemon;
}
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

export function searchPokemons() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    let { filterName } = getState().getTypes;
    filterName = filterName || "";
    return fetchPokemonsApi().then((pokemons: Pokemon[]) => {
      let filteredByName: Pokemon[] = [];
      if (filterName) {
        filteredByName = pokemons.filter((pokemon: Pokemon) => {
          const name = `${pokemon.name}`.toLowerCase();
          return name.startsWith(filterName.toLowerCase());
        });
      }
      dispatch(receiveSearchedPokemons(filteredByName));
    });
  };
}

function treatPokemons(
  pokemons: Pokemon[],
  sortedBy: string,
  page: number,
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<any> {
  return Promise.resolve(pokemons)
    .then((pokemons: Pokemon[]) =>
      Promise.resolve(sortPokemons(sortedBy, pokemons))
    )
    .then((pokemons: Pokemon[]) => {
      const pokemonsPage = pokemons.slice(
        (page - 1) * POKEMONS_PER_PAGE,
        page * POKEMONS_PER_PAGE
      );
      dispatch(receivePokemons(pokemonsPage, pokemons.length));
      return Promise.resolve(pokemonsPage);
    })
    .then((pokemons: Pokemon[]) => {
      dispatch(fetchAllPokemonDetails(pokemons));
    });
}
export function fetchPokemons() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    const { sortedBy } = getState().getTypes;
    const { page } = getState().getPokemons;
    return fetchPokemonsApi().then(pokemons =>
      treatPokemons(pokemons, sortedBy, page, dispatch)
    );
  };
}

function fetchPokemonsFromType() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    const { sortedBy, selectedType } = getState().getTypes;
    const { page } = getState().getPokemons;
    return getPokemonsFromTypeApi(selectedType.url).then(pokemons =>
      treatPokemons(pokemons, sortedBy, page, dispatch)
    );
  };
}

function sortPokemons(sortedBy: string, p: Pokemon[]): Promise<Pokemon[]> {
  if (!sortedBy) {
    return Promise.resolve(p);
  }
  const pokemons = [...p];
  switch (sortedBy) {
    default:
    case NUMBER_ASC:
      return Promise.resolve(pokemons);
    case NUMBER_DSC:
      return Promise.resolve(pokemons.reverse());
    case NAME_ASC:
      return Promise.resolve(
        pokemons.sort((a, b) => (`${a.name}` < `${b.name}` ? -1 : 1))
      );
    case NAME_DSC:
      return Promise.resolve(
        pokemons.sort((a, b) => (`${a.name}` < `${b.name}` ? 1 : -1))
      );
  }
}
