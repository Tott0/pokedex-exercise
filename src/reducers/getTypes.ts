import { REQUEST_TYPES, RECEIVE_TYPES, SELECT_POKEMON_TYPE } from "../actions";
import { Pokemon } from "../models/Pokemon.model";
const getTypes = (state = { types: [], selectedType: undefined }, action: any) => {
  // console.log('getpokemons', state);
  // console.log('getpokemons', action);
  switch (action.type) {
    case SELECT_POKEMON_TYPE:
    console.log(action);
      return Object.assign({}, state, {
        selectedType: action.selectedType
      });
    case REQUEST_TYPES:
      return Object.assign({}, state);
    case RECEIVE_TYPES:
      return Object.assign({}, state, {
        types: action.types,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default getTypes;
