import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Sidenav from "./components/Sidenav";
import PrimaryTopBar from "./components/PrimaryTopBar";
import { capitalise } from "../../helper/functions";
import { update_existing_flashcard } from "../../actions/flashcards";

class EditFlashcard extends Component {
  constructor(props) {
    super(props);

    const flashcard = props.flashcard;
    console.log("Flashcard:", flashcard);

    if (Object.keys(flashcard).length != 0) {
      this.state = {
        term: flashcard.term,
        meaning: flashcard.meaning.join(", "),
        reading: flashcard.reading.join(", "),
        readingSystem: flashcard.reading_system,
        definition: "",
        contextInput: "",
        context: flashcard.context,
        isLoading: false,
        isUpdated: false
      };
    } else {
      this.state = {
        term: "",
        meaning: "",
        reading: "",
        readingSystem: "",
        definition: "",
        contextInput: "",
        context: [],
        isLoading: false,
        isUpdated: true
      };
    }
  }
  async componentDidMount() {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDiscard(e) {
    if (e) e.preventDefault();

    this.setState({
      term: "",
      meaning: "",
      reading: "",
      readingSystem: "",
      definition: "",
      contextInput: "",
      context: []
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const deckId = this.props.match.params.id;
    console.log("Deck Id:", deckId);
    let {
      term,
      meaning,
      reading,
      readingSystem,
      definition,
      context
    } = this.state;
    term = capitalise(term);
    meaning = meaning
      .split(",")
      .map(x => capitalise(x.trim()))
      .filter(x => x !== "");
    reading = reading
      .split(",")
      .map(x => capitalise(x.trim()))
      .filter(x => x !== "");
    readingSystem = capitalise(readingSystem);

    if (term === "" || meaning.length == 0) {
      return;
    }

    const flashcard = Object.assign(this.props.flashcard, {
      term,
      meaning,
      reading,
      reading_system: readingSystem,
      definition,
      context
    });

    console.log(deckId, flashcard);

    await this.setState({ isLoading: true });
    const res = await this.props.update_existing_flashcard(deckId, flashcard);

    if (res) {
      this.setState({ ...this.state, isLoading: false, isUpdated: true });
    } else {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  onAddContext(e) {
    e.preventDefault();
    const { contextInput, context } = this.state;
    context.push(contextInput.trim());
    this.setState({ context, contextInput: "" });
  }

  onDeleteContext(index) {
    const { context } = this.state;
    context.splice(index, 1);

    this.setState({ ...this.state, context });
  }

  render() {
    const { id } = this.props.match.params;
    const {
      term,
      meaning,
      reading,
      readingSystem,
      definition,
      contextInput,
      context,
      isLoading,
      isUpdated
    } = this.state;

    let { title } = this.props;
    let infoFilled = term != "" && meaning != "";

    console.log("isLOADING:", isLoading);

    return (
      <div class="app-layout-single-bar">
        {isUpdated ? <Redirect to={`/study/${id}`} /> : ""}
        <Sidenav />

        <PrimaryTopBar title={title} />

        <main>
          <div class="add-flashcard-container container">
            <Link
              to={`/study/${id}`}
              className="return-button-arrow flex-horizontally"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,32A12,12,0,1,1,32,20,12,12,0,0,1,20,32Zm1.4-6.948-3.653-3.5h8.835a1.159,1.159,0,0,0,1.161-1.161v-.774a1.159,1.159,0,0,0-1.161-1.161H17.745l3.653-3.5a1.163,1.163,0,0,0,.019-1.66l-.532-.527a1.157,1.157,0,0,0-1.64,0l-6.421,6.416a1.156,1.156,0,0,0,0,1.64l6.421,6.421a1.157,1.157,0,0,0,1.64,0l.532-.527A1.163,1.163,0,0,0,21.4,25.052Z"
                  transform="translate(-8 -8)"
                />
              </svg>
              <p>Return</p>
            </Link>
            <div className="add-flashcard-window">
              <form>
                <header className="header">
                  <h2>Create Flashcard</h2>
                </header>

                <div className="term-container">
                  <div className="term-form">
                    <input
                      className="term-input"
                      placeholder="Your Term"
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      type="text"
                      tabindex="1"
                      name="term"
                      value={term}
                      onChange={e => this.onChange(e)}
                    />
                    <button
                      className="discard-button"
                      onClick={e => this.onDiscard(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                      >
                        <path
                          fill="currentColor"
                          d="M7.273,102l3.846-3.846.793-.793a.3.3,0,0,0,0-.424l-.849-.849a.3.3,0,0,0-.424,0L6,100.727l-4.639-4.64a.3.3,0,0,0-.424,0l-.849.849a.3.3,0,0,0,0,.424L4.727,102l-4.64,4.639a.3.3,0,0,0,0,.424l.849.849a.3.3,0,0,0,.424,0L6,103.273l3.846,3.846.793.793a.3.3,0,0,0,.424,0l.849-.849a.3.3,0,0,0,0-.424Z"
                          transform="translate(0 -96)"
                        />
                      </svg>
                      <p>Discard</p>
                    </button>

                    <Fragment>
                      <button
                        class={`submit-button ${
                          infoFilled ? "" : "not-active"
                        } ${isLoading ? "active-submit" : ""}
                        `}
                        type="submit"
                        tabindex="8"
                        onClick={e => {
                          infoFilled ? this.onSubmit(e) : e.preventDefault();
                        }}
                      >
                        <div>
                          <p>{isLoading ? "Saving" : "Save"}</p>
                          <svg
                            class="loading"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="spinner-third"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                            />
                          </svg>
                        </div>
                      </button>

                      <button
                        class={`submit-button-small ${
                          infoFilled ? "" : "not-active"
                        } ${isLoading ? "active-submit" : ""}
                        `}
                        type="submit"
                        tabindex="8"
                        onClick={e => {
                          infoFilled ? this.onSubmit(e) : e.preventDefault();
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="plus"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path
                            fill="currentColor"
                            d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
                          />
                        </svg>
                        <svg
                          class="loading"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="spinner-third"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                          />
                        </svg>
                      </button>
                    </Fragment>
                  </div>
                </div>

                <div className="flashcard-type-container">
                  <h2 className="title">SELECT YOUR FLASHCARD TYPE</h2>
                  <div className="flashcard-types">
                    <div className="flashcard-type selected">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="134"
                        height="89"
                        viewBox="0 0 134 89"
                      >
                        <g transform="translate(-933 -888.492)">
                          <g
                            fill="#fff"
                            stroke="#81889f"
                            strokeWidth="2px"
                            transform="translate(933 889)"
                          >
                            <rect
                              stroke="none"
                              width="120"
                              height="60"
                              rx="5"
                            />
                            <rect
                              fill="none"
                              x="1"
                              y="1"
                              width="118"
                              height="58"
                              rx="4"
                            />
                          </g>
                          <g
                            fill="#fff"
                            stroke="#81889f"
                            strokeWidth="2px"
                            transform="matrix(0.966, -0.259, 0.259, 0.966, 936.28, 919.551)"
                          >
                            <rect
                              stroke="none"
                              width="120"
                              height="60"
                              rx="5"
                            />
                            <rect
                              fill="none"
                              x="1"
                              y="1"
                              width="118"
                              height="58"
                              rx="4"
                            />
                          </g>
                          <rect
                            fill="#d9dce5"
                            width="90"
                            height="5"
                            transform="matrix(0.966, -0.259, 0.259, 0.966, 960.051, 951.579)"
                          />
                          <rect
                            fill="#d9dce5"
                            width="80"
                            height="5"
                            transform="matrix(0.966, -0.259, 0.259, 0.966, 962.551, 941.591)"
                          />
                          <circle
                            fill="#d9dce5"
                            cx="5.5"
                            cy="5.5"
                            r="5.5"
                            transform="translate(992 914)"
                          />
                        </g>
                      </svg>
                      <label className="type-name">Standard</label>
                    </div>
                    <div className="flashcard-type">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="68"
                        viewBox="0 0 60 68"
                      >
                        <path
                          fill="currentColor"
                          d="M30,55.78a2.675,2.675,0,0,1-2.679-2.656v-8.5a2.679,2.679,0,0,1,5.357,0v8.5A2.675,2.675,0,0,1,30,55.78ZM60,36.124v25.5A6.4,6.4,0,0,1,53.571,68H6.429A6.4,6.4,0,0,1,0,61.624v-25.5a6.4,6.4,0,0,1,6.429-6.375H8.571v-8.5a21.429,21.429,0,0,1,42.857.2v8.3h2.143A6.4,6.4,0,0,1,60,36.124ZM12.857,29.749H47.143v-8.5a17.143,17.143,0,0,0-34.286,0ZM55.714,61.624v-25.5A2.14,2.14,0,0,0,53.571,34H6.429a2.14,2.14,0,0,0-2.143,2.125v25.5a2.14,2.14,0,0,0,2.143,2.125H53.571A2.14,2.14,0,0,0,55.714,61.624Z"
                        />
                      </svg>
                    </div>
                    <div className="flashcard-type locked">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="68"
                        viewBox="0 0 60 68"
                      >
                        <path
                          fill="currentColor"
                          d="M30,55.78a2.675,2.675,0,0,1-2.679-2.656v-8.5a2.679,2.679,0,0,1,5.357,0v8.5A2.675,2.675,0,0,1,30,55.78ZM60,36.124v25.5A6.4,6.4,0,0,1,53.571,68H6.429A6.4,6.4,0,0,1,0,61.624v-25.5a6.4,6.4,0,0,1,6.429-6.375H8.571v-8.5a21.429,21.429,0,0,1,42.857.2v8.3h2.143A6.4,6.4,0,0,1,60,36.124ZM12.857,29.749H47.143v-8.5a17.143,17.143,0,0,0-34.286,0ZM55.714,61.624v-25.5A2.14,2.14,0,0,0,53.571,34H6.429a2.14,2.14,0,0,0-2.143,2.125v25.5a2.14,2.14,0,0,0,2.143,2.125H53.571A2.14,2.14,0,0,0,55.714,61.624Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flashcard-information-container">
                  <h2 className="title">FILL OUT INFORMATION</h2>
                  <div className="flashcard-information-form">
                    <div className="main-information">
                      <div className="form-field">
                        <div className="label-container">
                          <p className="label">Translation</p>
                        </div>
                        <div className="input-container">
                          <input
                            tabindex="2"
                            className="input-text"
                            type="text"
                            name="meaning"
                            value={meaning}
                            placeholder="Replace with your text"
                            onChange={e => this.onChange(e)}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <div className="label-container">
                          <p className="label">Reading</p>

                          <i>(Optional)</i>
                        </div>
                        <div className="input-container">
                          <input
                            tabindex="3"
                            className="input-text"
                            type="text"
                            name="reading"
                            value={reading}
                            placeholder="Replace with your text"
                            onChange={e => this.onChange(e)}
                          />

                          <div className="slide-list-form">
                            <input
                              tabindex="3"
                              className="list-form"
                              placeholder="Type In"
                              list="browsers"
                              autocomplete="off"
                              spellcheck="false"
                              name="readingSystem"
                              value={readingSystem}
                              onChange={e => this.onChange(e)}
                            />
                            <datalist id="browsers">
                              <option value="Latin"> </option>
                            </datalist>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="additional-information">
                      <div className="form-field">
                        <div className="label-container">
                          <p className="label">Definition</p>
                          <i>(Optional)</i>
                        </div>
                        <div className="input-container">
                          <input
                            tabindex="5"
                            className="input-text"
                            type="text"
                            name="definition"
                            value={definition}
                            placeholder="Replace with your text"
                            onChange={e => this.onChange(e)}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <div className="label-container">
                          <p className="label">Context</p>
                        </div>
                        <div className="verticall-stack">
                          <div className="input-container">
                            <input
                              tabindex="6"
                              className="input-text"
                              placeholder="Replace with your text"
                              type="text"
                              name="contextInput"
                              value={contextInput}
                              onChange={e => this.onChange(e)}
                            />

                            <button
                              className="add-button"
                              tabindex="6"
                              onClick={e => this.onAddContext(e)}
                            >
                              Add
                            </button>
                          </div>

                          {context.map((text, index) => (
                            <div className="sentence-container" key={index}>
                              <p className="ellipsis">{`"${text}"`}</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 12 12"
                                onClick={e => this.onDeleteContext(index)}
                              >
                                <path
                                  fill="currentColor"
                                  d="M7.273,102l3.846-3.846.793-.793a.3.3,0,0,0,0-.424l-.849-.849a.3.3,0,0,0-.424,0L6,100.727l-4.639-4.64a.3.3,0,0,0-.424,0l-.849.849a.3.3,0,0,0,0,.424L4.727,102l-4.64,4.639a.3.3,0,0,0,0,.424l.849.849a.3.3,0,0,0,.424,0L6,103.273l3.846,3.846.793.793a.3.3,0,0,0,.424,0l.849-.849a.3.3,0,0,0,0-.424Z"
                                  transform="translate(0 -96)"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="closing-form">
                  <button
                    class="discard-button"
                    onClick={e => this.onDiscard(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="currentColor"
                        d="M7.273,102l3.846-3.846.793-.793a.3.3,0,0,0,0-.424l-.849-.849a.3.3,0,0,0-.424,0L6,100.727l-4.639-4.64a.3.3,0,0,0-.424,0l-.849.849a.3.3,0,0,0,0,.424L4.727,102l-4.64,4.639a.3.3,0,0,0,0,.424l.849.849a.3.3,0,0,0,.424,0L6,103.273l3.846,3.846.793.793a.3.3,0,0,0,.424,0l.849-.849a.3.3,0,0,0,0-.424Z"
                        transform="translate(0 -96)"
                      />
                    </svg>
                    <p>Discard</p>
                  </button>
                  <button
                    class={`submit-button ${infoFilled ? "" : "not-active"} ${
                      isLoading ? "active-submit" : ""
                    }
                        `}
                    type="submit"
                    tabindex="8"
                    onClick={e => {
                      infoFilled ? this.onSubmit(e) : e.preventDefault();
                    }}
                  >
                    <div>
                      <p>{isLoading ? "Saving" : "Save"}</p>
                      <svg
                        class="loading"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="spinner-third"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id, flashcardId } = ownProps.match.params;
  console.log("Own Props:", ownProps);

  const currentDeck = state.flashcards.decks.find(x => x._id == id);
  let currentFlashcard = {};
  if (currentDeck) {
    currentFlashcard = currentDeck.flashcards.find(x => x._id == flashcardId);
  }

  const title = state.decks.decks
    ? state.decks.decks.find(x => x._id == id).title
    : "";

  return {
    isAuthenticated: state.auth.isAuthenticated,
    flashcard: currentFlashcard,
    title: title
  };
};

export default connect(
  mapStateToProps,
  { update_existing_flashcard }
)(EditFlashcard);
