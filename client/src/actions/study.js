import axios from "axios";
import { GET_FLASHCARDS, REMOVE_FLASHCARDS, ADD_NEW_FLASHCARD } from "./types";
import setAuthToken from "../utils/setAuthToken";

// GET NEW FLASHCARDS
export const get_new_flashcards = deckId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    console.log("ID", deckId);
    const res = await axios.get(`/api/flashcards/new/${deckId}`);
    if (res.data.length == 0) res.data = null;

    dispatch({
      type: GET_FLASHCARDS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// GET REVIEW FLASHCARDS
export const get_review_flashcards = deckId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/flashcards/review/${deckId}`);
    if (res.data.length == 0) res.data = null;

    dispatch({
      type: GET_FLASHCARDS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// REMOVE FLASHCARDS
export const remove_flashcards = () => async dispatch => {
  dispatch({
    type: REMOVE_FLASHCARDS,
    payload: {}
  });
};
