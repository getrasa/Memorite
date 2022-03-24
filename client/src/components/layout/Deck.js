import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import { connect } from "react-redux";
import PrimaryTopBar from "./components/PrimaryTopBar";
import SecondaryTopBar from "./components/SecondaryTopBar";
import Dashboard from "./deck/Dashboard";
import Flashcards from "./deck/Flashcards";
import Loading from "./main/Loading";
import { get_decks_flashcards } from "../../actions/flashcards";

const Deck = props => {
  let {
    currentDeck = {},
    isAuthenticated,
    authLoading,
    decksLoading,
    title,
    get_decks_flashcards
  } = props;

  const id = props.match.params.id;

  useEffect(() => {
    if (!props.currentDeck) {
      get_decks_flashcards(id);
    }
  }, []);

  const [state, setState] = useState({
    page: "dashboard",
    mobileSideNav: false
  });

  const toggleMobileSideNav = () => {
    setState({ ...state, mobileSideNav: !state.mobileSideNav });
  };

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/login" />;
  }

  const renderSwitch = page => {
    switch (page) {
      case "dashboard":
        return <Dashboard id={id} />;
      case "flashcards":
        return <Flashcards id={id} />;
      default:
        return <Dashboard id={id} />;
    }
  };

  const goPage = page => {
    setState({ page });
  };

  let reviews,
    lessons = 0;

  if (currentDeck.flashcards) {
    [reviews, lessons] = get_reviews_and_lessons(currentDeck.flashcards);
  }

  return (
    <Fragment>
      {decksLoading ? <Loading /> : ""}

      <div className="app-layout">
        <Sidenav
          mobileSideNav={state.mobileSideNav}
          hideMobileSideNav={toggleMobileSideNav.bind(this)}
        />

        <PrimaryTopBar
          title={title}
          toggleMobileSideNav={toggleMobileSideNav.bind(this)}
        />

        <SecondaryTopBar
          id={id}
          page={state.page}
          goPage={goPage.bind(this)}
          reviews={reviews}
          lessons={lessons}
        />

        {renderSwitch(state.page)}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  const title = state.decks.decks
    ? state.decks.decks.find(x => x._id == id).title
    : "";

  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    decksLoading: state.decks.loading,
    title: title,
    currentDeck: state.flashcards.decks.find(x => x._id == id)
  };
};

export default connect(
  mapStateToProps,
  { get_decks_flashcards }
)(Deck);

const get_reviews_and_lessons = flashcards => {
  let reviews = 0;
  let lessons = 0;
  const today = new Date().getTime();
  for (let i = 0; i < flashcards.length; i++) {
    const nextReviewDate = new Date(flashcards[i].next_review).getTime();
    if (flashcards[i].interval == 0) {
      lessons += 1;
    } else if (nextReviewDate <= today) {
      reviews += 1;
    }
  }
  return [reviews, lessons];
};
