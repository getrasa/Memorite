import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import createDeck from "./Deck";
import createFlashcard from "./Flashcard";
import LessonReview from "../lessons/LessonReview";

class Lessons extends React.Component {
  constructor() {
    super();

    this.state = {
      Deck: {},
      isQuiz: false,
      renderRedirect: false
    };
  }

  async componentDidMount() {
    let { Deck } = this.state;
    const { flashcards } = this.props;
    let flashcardArray = [];

    flashcards.forEach(flashcard => {
      const Flashcard = new createFlashcard(flashcard);
      flashcardArray.push(Flashcard);
    });
    Deck = new createDeck(flashcardArray);

    this.setState({ Deck });
  }

  startQuiz() {
    const isQuiz = true;
    this.setState({ isQuiz });
  }

  endQuiz() {
    const isQuiz = false;
    let { Deck, renderRedirect } = this.state;
    const batch = Deck.nextBatch();
    Deck.setCurrent();
    if (!batch) {
      renderRedirect = true;
    }
    this.setState({ isQuiz, renderRedirect });
  }

  render() {
    const { id } = this.props;
    let { Deck = {}, isQuiz } = this.state;

    return (
      <Fragment>
        {this.state.renderRedirect ? <Redirect to={`/study/${id}`} /> : ""}
        {Object.getOwnPropertyNames(Deck).length === 0 ? (
          ""
        ) : (
          <Fragment>
            {isQuiz ? (
              <LessonReview
                id={id}
                Deck={Deck}
                flashcards={Deck.batch}
                pass={Deck.passCurrent.bind(this)}
                executionCompleted={this.endQuiz.bind(this)}
                exit={this.props.executionCompleted.bind(this)}
              />
            ) : (
              <Fragment>
                <div className="fullscreen-container">
                  <div id="progress-bar" className="progress-bar">
                    <div
                      style={{
                        width: `${Math.floor(
                          (Deck.passed / Deck.remaining) * 100
                        )}%`
                      }}
                    />
                  </div>

                  <div className="information-bar flex-horizontally flex-center-vertically space-equally">
                    <i
                      className="home-button"
                      onClick={e => {
                        this.props.executionCompleted();
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="home-lg-alt"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M288 115L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V368a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2zm282.69 121.28l-255.94-226a39.85 39.85 0 0 0-53.45 0l-256 226a16 16 0 0 0-1.21 22.6L25.5 282.7a16 16 0 0 0 22.6 1.21L277.42 81.63a16 16 0 0 1 21.17 0L527.91 283.9a16 16 0 0 0 22.6-1.21l21.4-23.82a16 16 0 0 0-1.22-22.59z"
                        />
                      </svg>
                    </i>

                    <div className="flex-horizontally flex-center-vertically">
                      <i>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="thumbs-up"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                          />
                        </svg>
                      </i>
                      <p>{Deck.passed}</p>
                      <div className="flex">
                        <p className="flex-center">{Deck.remaining}</p>
                      </div>
                    </div>
                  </div>

                  <div className="review-section flex">
                    <div className="flex-fill-horizontally">
                      <div className="flex-vertically flex-center-horizontally">
                        <div className="review-window flex-vertically">
                          <div className="display-content flex">
                            <p className="flex-center">
                              {Array.isArray(Deck.getCurrent().getCurrentInfo())
                                ? Deck.getCurrent()
                                    .getCurrentInfo()
                                    .join(", ")
                                : Deck.getCurrent().getCurrentInfo()}
                            </p>
                            {Deck.getCurrent().infoIndex > 0 ? (
                              <svg
                                className="arrow-left"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="chevron-left"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                onClick={event => {
                                  Deck.previous();
                                  this.setState(Deck);
                                }}
                              >
                                <path
                                  fill="currentColor"
                                  d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                                />
                              </svg>
                            ) : (
                              ""
                            )}

                            {Deck.isNext() ? (
                              <svg
                                className="arrow-right"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="chevron-right"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                onClick={event => {
                                  Deck.next();
                                  this.setState({ Deck });
                                }}
                                onKeyPress={event => {
                                  console.log("Pressed", event);
                                }}
                              >
                                <path
                                  fill="currentColor"
                                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                />
                              </svg>
                            ) : (
                              <div
                                className="quiz-button flex"
                                onClick={event => {
                                  const isNext = Deck.next();
                                  if (!isNext) {
                                    isQuiz = true;
                                  }
                                  this.setState({ Deck, isQuiz });
                                }}
                              >
                                <div className="center-content">
                                  <p>Quiz</p>
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-right"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="description flex">
                            <p className="flex-center">
                              {Deck.getCurrent().getCurrentInfoDescription()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="information-nav flex-center-horizontally">
                    {Deck.getCurrent().infoArray.map((_, index) => (
                      <div
                        key={index}
                        onClick={event => {
                          Deck.getCurrent().setCurrentInfo(index);
                          this.setState(Deck);
                        }}
                        className={
                          index === Deck.getCurrent().infoIndex
                            ? "dot-button current"
                            : "dot-button"
                        }
                      />
                    ))}
                  </div>
                  <div className="chosen-words flex-center-horizontally">
                    {Deck.batch.map((word, index) => (
                      <div
                        key={index}
                        onClick={event => {
                          Deck.setCurrent(index);
                          Deck.getCurrent().setCurrentInfo(0);
                          this.setState(Deck);
                        }}
                        className={
                          index === Deck.currentIndex
                            ? "chosen-word current"
                            : "chosen-word"
                        }
                      >
                        {word.term}
                      </div>
                    ))}
                    {/* <div className="chosen-word current">人</div>
            <div className="chosen-word seen">What is</div>
            <div className="chosen-word">Whatever</div>
            <div className="chosen-word">Continuous</div>
            <div className="chosen-word">人女</div> */}
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

// export default connect(mapStateToProps)(Lessons);
export default Lessons;
