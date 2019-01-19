import {
  REQUEST_POKEMON,
  RECEIVE_POKEMON,
  REQUEST_POKEMONS,
  RECEIVE_POKEMONS,
  RECEIVE_SEARCHED_POKEMONS
} from "../actions";
import { Pokemon, Type } from "../models/Pokemon.model";
const getPokemons = (
  state = { pokemons: [], searchedPokemons: [], selectedType: Type },
  action: any
) => {
  const pokemons: Pokemon[] = [...state.pokemons];
  switch (action.type) {
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
      const i = pokemons.findIndex((pok: Pokemon) => {
        const a = "" + pok.name;
        return a.toLowerCase() === newPokemon.name.toLowerCase();
      });
      if (i >= 0) {
        pokemons[i] = newPokemon;
      }
      return Object.assign({}, state, {
        pokemons: pokemons,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default getPokemons;
