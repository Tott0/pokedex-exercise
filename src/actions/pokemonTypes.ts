import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Type, Pokemon } from "../models/Pokemon.model";
import { fetchPokemons, searchPokemons, selectPage, setPokemonsSource, getPokemonByName } from "./getPokemons";
import { REQUEST_TYPES, RECEIVE_TYPES, SELECT_POKEMON_TYPE, SORT_POKEMONS_BY, FILTER_POKEMONS_NAME, UPDATE_SELECTED_POKEMON_TYPES, TYPE_POKEMON_FETCH, DEFAULT_POKEMON_FETCH } from "../constants";
import { receivePokemon } from "./pokemonDetails";


export function requestTypes() {
  return {
    type: REQUEST_TYPES
  };
}


export function receiveTypes(types: Type[]) {
  return {
    type: RECEIVE_TYPES,
    types: types,
    receivedAt: Date.now()
  };
}


export function selectPokemonType(selectedType: Type) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: SELECT_POKEMON_TYPE,
      selectedType
    });
    console.log(selectedType);
    dispatch(setPokemonsSource(selectedType ? TYPE_POKEMON_FETCH : DEFAULT_POKEMON_FETCH));
    dispatch(selectPage(1));
  };
}

export function sortPokemonsBy(sortedBy: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: SORT_POKEMONS_BY,
      sortedBy
    });
    // dispatch(setPokemonsSource(DEFAULT_POKEMON_FETCH));
    dispatch(selectPage(1));
  };
}

export function filterPokemonsByName(filterName: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: FILTER_POKEMONS_NAME,
      filterName
    });
    dispatch(searchPokemons());
  };
}

export function updateselectedPokemonTypes() {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch({
      type: UPDATE_SELECTED_POKEMON_TYPES
    });
    dispatch(searchPokemons());
  };
}

export function getPokemonsFromTypeApi(url: string): Promise<Pokemon[]> {
  return axios
    .get<any>(url)
    .then(async (res: any) => {
      const data = res.data;
      // console.log(data);
      const pokemons = data.pokemon.map((dp: any) => new Pokemon(dp.pokemon));
      return Promise.resolve(pokemons);
    })
    .then()
    .catch(err => {
      console.error(err);
      return Promise.reject();
    });
}

export function fetchTypeDetailsApi(url: string): Promise<Type> {
  return axios
    .get<any>(url)
    .then(async (res: any) => {
      const data = res.data;
      // console.log(data);
      const damageRelations = await generateEffectivenessArray(data);
      const type = new Type({
        id: data.id,
        name: data.name,
        url: url,
        damageRelations: damageRelations
      });
      return Promise.resolve(type);
    })
    .catch(err => {
      console.error(err);
      return Promise.reject();
    });
}

var typesCache: Type[];
export const getTypesArray = () => {
  return typesCache;
};
export function updateTypesCache(type: Type) {
  const index = typesCache.findIndex(p => p.name === type.name);
  typesCache[index] = type;
}
function fetchTypesApi(): Promise<Type[]> {
  if (typesCache) {
    return Promise.resolve(typesCache);
  }
  return axios
    .get<any>(`https://pokeapi.co/api/v2/type/`)
    .then(res => {
      const data = res.data;
      const types = data.results.slice(0, 18).map((r: Type) => new Type(r));
      typesCache = types;
      // console.log(types);
      return Promise.resolve(types);
    })
    .catch(err => console.error(err));
}

function fetchAllTypesDetails(index: number, types: Type[]) {
  if (index > types.length) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {};
  }
  const type = types[index];
  if (!type) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {dispatch(fetchAllTypesDetails(++index, types))};
  }
  const url = type.url;
  if (!url || type.id) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {dispatch(fetchAllTypesDetails(++index, types))};
  }
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return fetchTypeDetailsApi(url)
      .then((type: Type) => {
        updateTypesCache(type);
        if (index === types.length - 1) {
          dispatch(receiveTypes(types));
          dispatch(updateselectedPokemonTypes());
        }
      })
      .then(() => dispatch(fetchAllTypesDetails(++index, types)));
  };
}

function fetchTypes() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(requestTypes());
    return fetchTypesApi()
      .then((types: Type[]) => {
        dispatch(receiveTypes(types));
        return Promise.resolve(types);
      })
      .then((types: Type[]) => dispatch(fetchAllTypesDetails(0, types)));
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

export async function generateEffectivenessArray(type: any): Promise<number[]> {
  const pokemonTypes = await fetchTypesApi();
  const pokemonTypeNames = pokemonTypes.map(pt => pt.name);
  return pokemonTypeNames.map((ptn: any) => {
    if (
      type.damage_relations.double_damage_from.some(
        (type: Type) => type.name === ptn.toLowerCase()
      )
    ) {
      return 2;
    }
    if (
      type.damage_relations.half_damage_from.some(
        (type: Type) => type.name === ptn.toLowerCase()
      )
    ) {
      return 0.5;
    }
    if (
      type.damage_relations.no_damage_from.some(
        (type: Type) => type.name === ptn.toLowerCase()
      )
    ) {
      return 0;
    }
    return 1;
  });
}
