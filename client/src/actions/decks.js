import axios from "axios";

import {
  GET_DECKS,
  ADD_DECK,
  UPDATE_DECK,
  DELETE_DECK,
  GET_REVIEW_FLASHCARDS
} from "./types";

import setAuthToken from "../utils/setAuthToken";

// GET ALL DECKS
export const get_decks = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/decks/main");
    dispatch({
      type: GET_DECKS,
      payload: res.data
    });
  } catch (err) {}
};

// ADD NEW DECK
export const add_new_deck = ({ title, language, native }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    title,
    language,
    native
  });

  try {
    const res = await axios.post("api/decks/create", body, config);
    res.data.reviews = 0;
    res.data.new = 0;
    res.data.total = 0;

    dispatch({
      type: ADD_DECK,
      payload: res.data
    });
  } catch (err) {}
};

// UPDATE DECK
export const update_deck = deck => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(deck);

  try {
    const res = await axios.post("api/decks/update", body, config);

    dispatch({
      type: UPDATE_DECK,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// DELETE DECK
export const delete_deck = _id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(_id);

  try {
    const res = await axios.post("api/decks/delete", body, config);

    dispatch({
      type: DELETE_DECK,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// GET REVIEW READY FLASHCARDS
export const get_review_flashcards = deckId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`api/decks/review/${deckId}`);
    dispatch({
      type: GET_REVIEW_FLASHCARDS,
      payload: res.data
    });
  } catch (err) {}
};
