import {
  REQUEST_POKEMON,
  RECEIVE_POKEMON,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  RECEIVE_SEARCHED_POKEMONS,
  RECEIVE_POKEMON_BY_NAME,
  UPDATE_SELECTED_POKEMON_TYPES
} from "../actions";
import { Pokemon, Type } from "../models/Pokemon.model";
const getPokemons = (
  state = {
    pokemon: undefined,
    pokemons: [],
    searchedPokemons: [],
    loadingPokemons: false,
    allPokemonsLoaded: false,
    selectedType: Type
  },
  action: any
) => {
  const pokemons: Pokemon[] = [...state.pokemons];
  switch (action.type) {
    case RECEIVE_POKEMON_BY_NAME:
      return Object.assign({}, state, {
        pokemon: action.pokemon
      });
    case REQUEST_POKEMONS:
      return Object.assign({}, state);
    case RECEIVE_POKEMONS:
      return Object.assign({}, state, {
        pokemons: action.pokemons,
        lastUpdated: action.receivedAt
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
        loadingPokemons: action.loadingPokemons,
        lastUpdated: action.receivedAt
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
