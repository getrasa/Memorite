import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { update_existing_flashcard } from "../../../actions/flashcards";
import Input from "./Input";
import DisplayWindow from "./DisplayWindow";
import TermInformation from "./TermInformation";
import createFlashcards from "./Flashcards";
import {
  mapIntervalToLevel,
  mapIntervalToHours,
  addHoursToDate
} from "../../../helper/functions";

class Review extends React.Component {
  constructor(props) {
    super();

    this.state = {
      Flashcards: {},
      style: "question",
      displayStatus: false
    };
  }

  async componentDidMount() {
    let { flashcards } = this.props;
    const Flashcards = new createFlashcards(flashcards);

    this.setState({ Flashcards });
  }

  checkAnswer(input) {
    let { Flashcards, style, displayStatus } = this.state;
    // const input = event.target.value;

    const isCorrect = Flashcards.check(input);
    console.log("IS CORRECT:", isCorrect);
    const isInQueue = Flashcards.isCurrentInQueue();
    const hasFailedBefore = Flashcards.hasCurrentFailed();

    if (isCorrect && !isInQueue) {
      displayStatus = true;
      if (!hasFailedBefore) Flashcards.correct += 1;

      Flashcards.remaining -= 1;
    }

    style = isCorrect ? "correct" : "incorrect";

    this.setState({ Flashcards, style, displayStatus });
  }

  setNextFlashcard(input) {
    let { Flashcards, style, displayStatus } = this.state;

    const isCorrect = Flashcards.check(input);
    const isInQueue = Flashcards.isCurrentInQueue();
    const hasFailedBefore = Flashcards.hasCurrentFailed();

    const fullFlashcard = Flashcards.getFullFlashcard();

    if (isCorrect && !isInQueue) {
      const deckId = this.props.id;
      if (hasFailedBefore)
        this.updateFlashcard(fullFlashcard, "failed", deckId);
      else this.updateFlashcard(fullFlashcard, "passed", deckId);
    }

    if (!isCorrect) {
      Flashcards.failCurrent();
      Flashcards.returnCurrentToQueue();
    }

    style = "question";
    displayStatus = false;
    const isNotLast = Flashcards.next();
    if (!isNotLast) {
      console.log("END!");
      this.props.executionCompleted();
    }
    Flashcards.updatePercentage();
    this.setState({ Flashcards, style, displayStatus });
  }

  updateFlashcard(flashcard, status, deckId) {
    let { interval, level, next_review } = flashcard;
    let date = new Date();

    if (status === "passed") interval += 1;
    if (status === "failed" && interval > 1) interval -= 1;

    const hours = mapIntervalToHours(interval);
    level = mapIntervalToLevel(interval);
    date = addHoursToDate(date, hours);
    next_review = date.toISOString();

    Object.assign(flashcard, { interval, level, next_review });

    this.props.update_existing_flashcard(deckId, flashcard);
  }

  changeStyle(style = "question") {
    this.setState({ style });
  }

  render() {
    const { Flashcards = {}, style, displayStatus } = this.state;
    const { id } = this.props;
    const { current = {}, remaining, correct, percentage, length } = Flashcards;

    console.log("Current", current);

    return (
      <Fragment>
        {Object.getOwnPropertyNames(Flashcards).length === 0 ? (
          ""
        ) : (
          <Fragment>
            <div className="fullscreen-container">
              <div id="progress-bar" className="progress-bar">
                <div
                  style={{
                    width: `${Math.floor((1 - remaining / length) * 100)}%`
                  }}
                />
              </div>

              <div className="information-bar flex-horizontally flex-center-vertically space-equally">
                <i
                  className="home-button"
                  onClick={e => this.props.executionCompleted()}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="home-lg-alt"
                    className="svg-inline--fa fa-home-lg-alt fa-w-18"
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
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="percentage"
                    className="svg-inline--fa fa-percentage fa-w-10"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 100 320 320"
                  >
                    <path
                      fill="currentColor"
                      d="M317.66 132.28c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L296.5 153.44l21.16-21.16zM64 224c16.38 0 32.76-6.25 45.25-18.74 24.99-24.99 24.99-65.52 0-90.51C96.76 102.25 80.38 96 64 96s-32.76 6.25-45.26 18.75c-24.99 24.99-24.99 65.52 0 90.51C31.24 217.75 47.62 224 64 224zm-22.62-86.63C47.42 131.33 55.45 128 64 128s16.58 3.33 22.63 9.37c12.48 12.48 12.47 32.78 0 45.25C80.59 188.67 72.55 192 64 192c-8.55 0-16.58-3.33-22.62-9.37-12.48-12.48-12.48-32.78 0-45.26zM256 288c-16.38 0-32.76 6.25-45.26 18.75-24.99 24.99-24.99 65.52 0 90.51C223.24 409.75 239.62 416 256 416s32.76-6.25 45.25-18.74c24.99-24.99 24.99-65.52 0-90.51C288.76 294.25 272.38 288 256 288zm22.63 86.63c-6.04 6.04-14.08 9.37-22.63 9.37-8.55 0-16.58-3.33-22.62-9.37-12.48-12.48-12.48-32.78 0-45.26 6.04-6.04 14.08-9.37 22.62-9.37 8.55 0 16.58 3.33 22.63 9.37 12.48 12.48 12.47 32.78 0 45.26z"
                    />
                  </svg>
                  <p>{percentage}</p>
                  <i>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="thumbs-up"
                      className="svg-inline--fa fa-thumbs-up fa-w-16"
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
                  <p>{correct}</p>
                  <div className="flex">
                    <p className="flex-center">{remaining}</p>
                  </div>
                </div>
              </div>

              <div className="review-section flex">
                <div className="flex-fill-horizontally">
                  <div className="flex-vertically flex-center-horizontally">
                    <DisplayWindow
                      current={current}
                      hasFailedBefore={Flashcards.hasCurrentFailed()}
                      displayStatus={displayStatus}
                    />

                    <Input
                      onEnter={this.checkAnswer.bind(this)}
                      isCurrentMeaning={!current.reading}
                      setNextFlashcard={this.setNextFlashcard.bind(this)}
                      style={this.state.style}
                      changeStyle={this.changeStyle.bind(this)}
                    />
                  </div>
                </div>
              </div>

              {style === "question" ? (
                <div className="scroll-answer-button flex">
                  <p className="flex-center">Answer</p>
                </div>
              ) : (
                <div
                  className="scroll-answer-button flex scroll-answer-button-active"
                  onClick={event => {
                    console.log("SHIT");
                    window.scrollTo(0, document.body.scrollHeight);
                  }}
                >
                  <p className="flex-center">Answer</p>
                </div>
              )}
            </div>

            {style === "question" ? (
              ""
            ) : (
              <TermInformation flashcard={Flashcards.getFullFlashcard()} />
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { update_existing_flashcard }
)(Review);
