import { SET_ALERT, REMOVE_ALERT, RESET_ALERTS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);

    case RESET_ALERTS:
      return initialState;

    default:
      return state;
  }
}
