import {
  SELECT_PAGE,
  REQUEST_POKEMON,
  RECEIVE_POKEMON,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  RECEIVE_SEARCHED_POKEMONS,
  RECEIVE_POKEMON_BY_NAME,
  UPDATE_SELECTED_POKEMON_TYPES,
  DEFAULT_POKEMON_FETCH,
  SET_POKEMONS_SOURCE
} from "../constants";
import { Pokemon, Type } from "../models/Pokemon.model";
const getPokemons = (
  state = {
    pokemon: undefined,
    pokemons: [],
    searchedPokemons: [],
    loadingPokemons: false,
    allPokemonsLoaded: false,
    selectedType: Type,
    page: 0,
    totalPokemons: 0,
    pokemonsSource: DEFAULT_POKEMON_FETCH
  },
  action: any
) => {
  const pokemons: Pokemon[] = [...state.pokemons];
  switch (action.type) {
    case SELECT_PAGE:
      return Object.assign({}, state, { page: action.page });
      case SET_POKEMONS_SOURCE:
      return Object.assign({}, state, { pokemonsSource: action.pokemonsSource });
    case RECEIVE_POKEMON_BY_NAME:
      return Object.assign({}, state, {
        pokemon: action.pokemon
      });
    case REQUEST_POKEMONS:
      return Object.assign({}, state);
    case RECEIVE_POKEMONS:
      return Object.assign({}, state, {
        pokemons: action.pokemons,
        totalPokemons: action.totalPokemons
      });
    case RECEIVE_SEARCHED_POKEMONS:
      return Object.assign({}, state, {
        searchedPokemons: action.searchedPokemons
      });
    case REQUEST_POKEMON:
      return Object.assign({}, state);
    case RECEIVE_POKEMON:
      const { pokemon: newPokemon } = action;

      let i;
      if (!newPokemon.name) {
        i = -1;
      } else {
        i = pokemons.findIndex((pok: Pokemon) => {
          const a = "" + pok.name;
          return a.toLowerCase() === newPokemon.name.toLowerCase();
        });
      }
      if (i >= 0) {
        pokemons[i] = newPokemon;
      }
      // console.log(action);
      return Object.assign({}, state, {
        pokemons: pokemons,
        allPokemonsLoaded: action.allPokemonsLoaded,
        loadingPokemons: action.loadingPokemons
      });
    case UPDATE_SELECTED_POKEMON_TYPES:
      const { pokemon } = state;
      return Object.assign({}, state, {
        pokemon: pokemon
      });
    default:
      return state;
  }
};

export default getPokemons;
