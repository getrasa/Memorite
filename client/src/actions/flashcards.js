import {
  GET_DECKS_FLASHCARDS,
  ADD_NEW_FLASHCARD,
  UPDATE_EXISTING_FLASHCARD
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// ADD NEW FLASHCARD
export const add_new_flashcard = ({
  deckId,
  term,
  meaning,
  reading,
  readingSystem,
  definition,
  context
}) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    term,
    meaning,
    reading,
    readingSystem,
    definition,
    context
  });

  let res = null;

  try {
    res = await axios.post(`/api/flashcards/add/${deckId}`, body, config);

    dispatch({
      type: ADD_NEW_FLASHCARD,
      payload: { id: deckId, data: res.data }
    });
  } catch (err) {
    console.error(err.message);
  }

  return res;
};

// UPDATE EXISTING FLASHCARD
export const update_existing_flashcard = (
  deckId,
  flashcard
) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  console.log("WORKS UPDATE:", flashcard);
  let res = null;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // const body = JSON.stringify({ ...flashcard });

    res = await axios.post(
      `/api/flashcards/update/${deckId}`,
      flashcard,
      config
    );

    console.log("RESPONSE UPDATE:", res.data);

    dispatch({
      type: UPDATE_EXISTING_FLASHCARD,
      payload: { deckId, flashcard: res.data }
    });
    console.log("Flashcard updated:", res);
  } catch (error) {
    console.error("Flashcard error: Failed updating flashcard.");
  }

  return res;
};

// GET ALL FLASHCARDS
export const get_decks_flashcards = deckId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/flashcards/all/${deckId}`);
    console.log("ALL FLASHCARDS:", res.data);

    const payload = {
      _id: deckId,
      flashcards: res.data,
      loading: false
    };

    dispatch({
      type: GET_DECKS_FLASHCARDS,
      payload: payload
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const remove_decks_flashcards = deckId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
};
