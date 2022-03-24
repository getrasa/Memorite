import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ListItem from "./ListItem";

class Flashcards extends Component {
  render() {
    const { list = [], loading } = this.props;
    const { id } = this.props;

    return (
      <main>
        <div className="container flex-vertically">
          <div
            id="search-bar"
            className="search-bar flex-horizontally flex-center-vertically space-equally"
          >
            <div className="position-relative">
              <input type="text" name="" placeholder="Search" />
              <div
                id="search-button"
                className="search-button position-absolute-right flex"
              >
                <svg
                  className="flex-center"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="search"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex">
              <svg
                className="flex-center"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="trash"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                />
              </svg>
            </div>
          </div>

          <div className="search-results flex-vertically">
            <div className="search-header-names">
              <div />
              <p>Term</p>
              <p>Meaning</p>
              <p>Reading</p>
              <p>Level</p>
            </div>
            <div className="flashcards-list flex-vertically">
              {!loading
                ? list.map(flashcard => (
                    <Link to={`/study/edit/${id}/${flashcard._id}`}>
                      <ListItem data={flashcard} />
                    </Link>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("Dashboard ownProps:", ownProps);
  const id = ownProps.id;

  return {
    id: id,
    isAuthenticated: state.auth.isAuthenticated,
    list: (state.flashcards.decks.find(x => x._id == id) || {}).flashcards,
    loading: state.flashcards.decks.loading
  };
};

export default connect(mapStateToProps)(Flashcards);
