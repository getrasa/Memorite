import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/layout/Main";
import Deck from "./components/layout/Deck";
import ReviewLoader from "./components/layout/ReviewLoader";
import LessonLoader from "./components/layout/LessonLoader";
import AddFlashcard from "./components/layout/AddFlashcard";
import EditFlashcard from "./components/layout/EditFlashcard";
import setAuthToken from "./utils/setAuthToken";
import { resetAlerts } from "./actions/alert";
import { loadUser } from "./actions/auth";
import { get_decks } from "./actions/decks";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      await store.dispatch(loadUser());
      await store.dispatch(get_decks());
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/study" component={Main} />
              <Route exact path="/study/:id" component={Deck} />
              <Route exact path="/study/add/:id" component={AddFlashcard} />
              <Route
                exact
                path="/study/edit/:id/:flashcardId"
                component={EditFlashcard}
              />
              <Route exact path="/study/review/:id" component={ReviewLoader} />
              <Route exact path="/study/lessons/:id" component={LessonLoader} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
