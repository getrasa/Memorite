import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import decks from "./decks";
import study from "./study";
import flashcards from "./flashcards";

export default combineReducers({ auth, alert, decks, study, flashcards });
