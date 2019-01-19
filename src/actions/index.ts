import { fetchColorsApi } from "../services/colors";
import { ThunkDispatch } from "redux-thunk";

export const selectColor = (rgb: string) => ({
  type: "SELECT_COLOR",
  rgb
});

export const REQUEST_COLORS = "REQUEST_COLORS";
export function requestColors() {
  return {
    type: REQUEST_COLORS
  };
}

export const RECEIVE_COLORS = "RECEIVE_COLORS";
export function receiveColors(colors: any[]) {
  return {
    type: RECEIVE_COLORS,
    colors: colors,
    receivedAt: Date.now()
  };
}

function fetchColors() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(requestColors())
    return fetchColorsApi()
      .then(colors => dispatch(receiveColors(colors)))
  }
}

function shouldFetchColors(state: any) {
  const {colors} = state;
  if (!colors || colors.length <= 0) {
    return true;
  } else {
    return false;
  }
}

export function fetchColorsIfNeeded(): (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => any {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: any) => {
    if (shouldFetchColors(getState())) {
      return dispatch(fetchColors());
    }
  };
}
