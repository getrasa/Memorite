import {
  GET_DECKS_FLASHCARDS,
  ADD_NEW_FLASHCARD,
  UPDATE_EXISTING_FLASHCARD
} from "../actions/types";

const initialState = {
  decks: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DECKS_FLASHCARDS:
      return {
        decks: [...state.decks, payload]
      };

    case ADD_NEW_FLASHCARD: {
      const { id, data } = payload;
      // let updatedDeck = state.decks.find(x => x.id == id);
      // updatedDeck.flashcards.push(data);
      // const stateWithoutOldDeck = state.decks.filter(x => x.id != id);
      let updatedDeck = state.decks.map(deck => {
        if (deck._id == id) deck.flashcards.push(data);
        return deck;
      });
      console.log("updatedDeck", updatedDeck);

      return {
        // decks: [...stateWithoutOldDeck, updatedDeck]
        decks: updatedDeck
      };
    }

    case UPDATE_EXISTING_FLASHCARD: {
      const { deckId, flashcard } = payload;
      const { _id } = flashcard;
      let updatedDeck = state.decks.find(x => x._id == deckId);
      updatedDeck.flashcards = updatedDeck.flashcards.map(x =>
        x._id == _id ? flashcard : x
      );
      const stateWithoutOldDeck = state.decks.filter(x => x.id != deckId);
      return {
        decks: [...stateWithoutOldDeck, updatedDeck]
      };
    }
    default:
      return {
        ...state
      };
  }
}
