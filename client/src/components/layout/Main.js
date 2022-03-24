import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import DeckItem from "./main/DeckItem";
import Sidenav from "./components/Sidenav";
import CreateDeckPopUp from "./main/CreateDeckPopUp";
import Loading from "./main/Loading";
import { connect } from "react-redux";
import { get_decks } from "../../actions/decks";

const Main = ({
  get_decks,
  decks,
  isAuthenticated,
  authLoading,
  decksLoading
}) => {
  useEffect(() => {
    if (!authLoading) {
      get_decks();
    }
  }, []);

  const [state, setState] = useState({
    createDeckPopUp: false
  });

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/login" />;
  }

  const closePopUp = () => {
    setState({ createDeckPopUp: false });
  };

  return (
    <Fragment>
      {decksLoading ? <Loading /> : ""}

      {state.createDeckPopUp ? (
        <CreateDeckPopUp closePopUp={closePopUp.bind(this)} />
      ) : (
        ""
      )}
      <div className="app-layout-one-top-bar">
        <div className="main-top-bar">
          <div className="container flex-horizontally flex-center-vertically">
            <h1>Decks</h1>
          </div>
        </div>
        <Sidenav />

        <main className="main">
          <div className="deck-grid">
            <div
              className="card add-card flex"
              onClick={e => {
                setState({ createDeckPopUp: true });
              }}
            >
              <div className="flex-center flex-vertically flex-center-items-horizontally">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="plus"
                  className="svg-inline--fa fa-plus fa-w-12"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
                  />
                </svg>
                <p>Create Deck</p>
              </div>
            </div>

            {decks
              ? decks.map(deck => (
                  <DeckItem
                    title={deck.title}
                    language={deck.language}
                    native={deck.native}
                    reviews={deck.reviews}
                    lessons={deck.new}
                    total={deck.total}
                    id={deck._id}
                    key={deck._id}
                  />
                ))
              : ""}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  decks: state.decks.decks,
  decksLoading: state.decks.loading
});

export default connect(
  mapStateToProps,
  { get_decks }
)(Main);
