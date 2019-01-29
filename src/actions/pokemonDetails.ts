import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { updatePokemonsCache, fetchPokemonsApi } from "./getPokemons";
import { Pokemon, Ability, Type } from "../models/Pokemon.model";
import { getTypesArray } from "./pokemonTypes";
import { fetchAllAbilityDetails } from "./pokemonAbilities";
import { REQUEST_POKEMON, RECEIVE_POKEMON } from "../constants";

export function requestPokemon(url: string) {
  return {
    type: REQUEST_POKEMON,
    loadingPokemons: true,
    url
  };
}

export function receivePokemon(
  pokemon: Pokemon,
  loadingPokemons = true,
  allPokemonsLoaded = false
) {
  return {
    type: RECEIVE_POKEMON,
    pokemon: pokemon,
    loadingPokemons: loadingPokemons,
    allPokemonsLoaded: allPokemonsLoaded,
    receivedAt: Date.now()
  };
}

export async function fetchPokemonApi(url: string): Promise<Pokemon> {
  return axios
    .get<any>(url)
    .then(res => {
      const data = res.data;
      const types = getTypesArray();
      const pokemon = new Pokemon({
        id: data.id,
        name: data.name,
        url: url,
        img: data.sprites.front_default
          ? data.sprites.front_default
          : "https://vignette.wikia.nocookie.net/undertale-au/images/d/d8/MissingNo..png/revision/latest?cb=20170828074638",
        types: data.types
          .sort((a: any, b: any) => (a.slot < b.slot ? -1 : 1))
          .map((dataTypes: any) =>
            types.find(
              tp => ("" + tp.name).toLowerCase() === dataTypes.type.name
            )
          ),
        stats: data.stats.map((st: any) => ({
          name: st.stat.name,
          value: st.base_stat
        })),
        abilities: data.abilities
          .sort((a: any, b: any) => (a.slot < b.slot ? -1 : 1))
          .map(
            (a: any) =>
              new Ability({ name: a.ability.name, url: a.ability.url })
          )
      });
      return Promise.resolve(pokemon);
    })
    .catch(err => {
      console.error(err);
      return Promise.reject();
    });
}

function fetchAllPokemons(index: number, pokemons: Pokemon[]) {
  if (index >= pokemons.length) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch(receivePokemon(new Pokemon(), false, true));
    };
  }
  const pokemon = pokemons[index];
  if (!pokemon) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch(fetchAllPokemons(++index, pokemons));
    };
  }
  const url = pokemon.url;
  if (!url || pokemon.id) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch(fetchAllPokemons(++index, pokemons));
    };
  }
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    fetchPokemonsApi().then(pokemonsFromApi => {
      const pokemonFromCache = pokemonsFromApi.find((p: Pokemon) => {
        return p.name === pokemon.name;
      });
      if (pokemonFromCache) {
        if (pokemonFromCache.id) {
          return Promise.resolve(pokemonFromCache);
        }
      }
      return fetchPokemonApi(url)
    })
    .then((pokemon: Pokemon) => {
      updatePokemonsCache(pokemon);
      dispatch(receivePokemon(pokemon, index < pokemons.length));
      return Promise.resolve(pokemon);
    })
    .then(() => dispatch(fetchAllPokemons(++index, pokemons)));
  };
}

export function fetchAllPokemonDetails(pokemons: Pokemon[]) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    return dispatch(fetchAllPokemons(0, pokemons));
  };
}
