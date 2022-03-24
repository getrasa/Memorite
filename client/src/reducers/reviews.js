import {
  GET_REVIEW_FLASHCARDS,
  UPDATE_REVIEW_FLASHCARDS,
  DELETE_REVIEW_FLASHCARDS
} from "../actions/types";

const initialState = {
  flashcards: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEW_FLASHCARDS:
      return {
        ...state,
        loading: false,
        flashcards: payload
      };
    case UPDATE_REVIEW_FLASHCARDS:
      return {
        ...state,
        flashcards: payload
      };
    case DELETE_REVIEW_FLASHCARDS: {
      return {
        ...state,
        flashcards: {}
      };
    }
    default:
      return state;
  }
}
