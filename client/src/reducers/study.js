import { GET_FLASHCARDS, REMOVE_FLASHCARDS } from "../actions/types";

const initialState = {
  flashcards: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FLASHCARDS:
      return {
        ...state,
        loading: false,
        flashcards: payload
      };
    case REMOVE_FLASHCARDS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
