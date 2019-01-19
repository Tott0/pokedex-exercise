import { REQUEST_COLORS, RECEIVE_COLORS } from "../actions";
const getColors = (state = {colors: []}, action: any) => {
  // console.log('getcolors', state);
  // console.log('getcolors', action);
  switch (action.type) {
    case REQUEST_COLORS:
      return Object.assign({}, state);
    case RECEIVE_COLORS:
      return Object.assign({}, state, {
        colors: action.colors,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default getColors;
