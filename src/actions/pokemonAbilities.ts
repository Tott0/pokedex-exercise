import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Type, Ability } from "../models/Pokemon.model";
import { Pokemon } from "../models/Pokemon.model";
import { updatePokemonsCache } from "./getPokemons";
import { receivePokemon } from "./pokemonDetails";
import { REQUEST_ABILITY, RECEIVE_ABILITY } from "../constants";

function requestAbility() {
  return {
    type: REQUEST_ABILITY
  };
}

function receiveAbility(abiliy: Ability[]) {
  return {
    type: RECEIVE_ABILITY,
    abiliy: abiliy,
  };
}

function fetchAbilityApi(url: string) {
  return axios
  .get<any>(url)
  .then(res => {
    const data = res.data;
    // console.log(data);
    const ability = new Ability({
      id: data.id,
      name: data.name,
      url: url,
      shortEffect: data.effect_entries[0].short_effect
    });
    return Promise.resolve(ability);
  })
  .catch(err => {
    console.error(err);
    return Promise.reject();
  });
}

function fetchAllAbilities(index: number, pokemon: Pokemon) {
  const abilities = pokemon.abilities || [];
  if (index > abilities.length) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {};
  }
  const ability = abilities[index];
  if (!ability) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {dispatch(fetchAllAbilities(++index, pokemon))};
  }
  const url = ability.url;
  if (!url || ability.id) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {dispatch(fetchAllAbilities(++index, pokemon))};
  }
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    dispatch(requestAbility());
    return fetchAbilityApi(url)
      .then((ability: Ability) => {
        pokemon.abilities = pokemon.abilities || [];
        const index = pokemon.abilities.findIndex(p => p.name === ability.name);
        if(index >= 0){
          pokemon.abilities[index] = ability;
        }else{
          pokemon.abilities = [...pokemon.abilities, ability];
        }
        updatePokemonsCache(pokemon);
        const{ loadingPokemons, allPokemonsLoaded } = getState().getPokemons;
        dispatch(receivePokemon(pokemon, loadingPokemons, allPokemonsLoaded));
      })
      .then(() => {
        dispatch(fetchAllAbilities(++index, pokemon))
      });
  };
}

export function fetchAllAbilityDetails(pokemon: Pokemon) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    return dispatch(fetchAllAbilities(0, pokemon));
  };
}