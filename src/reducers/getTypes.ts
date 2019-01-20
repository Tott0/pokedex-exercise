import {
  REQUEST_TYPES,
  RECEIVE_TYPES,
  SELECT_POKEMON_TYPE,
  SORT_POKEMONS_BY,
  NUMBER_ASC,
  FILTER_POKEMONS_NAME
} from "../actions";
const getTypes = (
  state = { types: [], selectedType: undefined, sortedBy: NUMBER_ASC },
  action: any
) => {
  switch (action.type) {
    case SELECT_POKEMON_TYPE:
      return Object.assign({}, state, {
        selectedType: action.selectedType
      });
    case SORT_POKEMONS_BY:
      return Object.assign({}, state, {
        sortedBy: action.sortedBy
      });
    case FILTER_POKEMONS_NAME:
      return Object.assign({}, state, {
        filterName: action.filterName
      });
    case REQUEST_TYPES:
      return Object.assign({}, state);
    case RECEIVE_TYPES:
      // console.log(action);
      return Object.assign({}, state, {
        types: action.types,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default getTypes;
