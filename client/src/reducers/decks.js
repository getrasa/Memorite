import {
  GET_DECKS,
  ADD_DECK,
  UPDATE_DECK,
  DELETE_DECK
} from "../actions/types";

const initialState = {
  decks: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DECKS:
      return {
        ...state,
        loading: false,
        decks: payload
      };
    case ADD_DECK:
      return {
        ...state,
        decks: [...state.decks, payload]
      };

    case UPDATE_DECK:
      return {
        ...state,
        decks: state.decks.map(x =>
          x._id == payload._id ? Object.assign(x, payload) : x
        )
      };
    case DELETE_DECK:
      return {
        ...state,
        decks: state.decks.filter(x => x._id != payload._id)
      };
    default:
      return state;
  }
}
