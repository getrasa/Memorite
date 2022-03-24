import React, { Component } from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import {
  mapLevelToName,
  addHoursToDate,
  dateGreaterThan,
  dateLessThan,
  dateDifferenceSec
} from "../../../helper/functions";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      levels: {
        novice: 0,
        proficient: 0,
        advanced: 0,
        superior: 0,
        burned: 0
      }
    };
  }

  render() {
    const { flashcards = [], loading } = this.props;
    const { levels } = this.state;
    let levelCount = {};
    let next_review_list = [];
    if (!loading) {
      levelCount = flashcards.reduce(
        (obj, v) => {
          const key = mapLevelToName(v.level);
          obj[key] = (obj[key] || 0) + 1;

          return obj;
        },
        {
          novice: 0,
          proficient: 0,
          advanced: 0,
          superior: 0,
          burned: 0
        }
      );
      for (let i = 0; i > flashcards.length; i++) {
        next_review_list.push(flashcards[i].next_review);
      }
    } else levelCount = levels;

    let nextReviewTime = "Never";

    const now = new Date();
    const today = addHoursToDate(new Date(), 24);
    const tomorrow = addHoursToDate(new Date(), 48);

    let nearestReviewDate = null;
    let reviewCountToday = 0;
    let reviewCountTomorrow = 0;

    for (let i = 0; i < flashcards.length; i++) {
      const next_review = new Date(flashcards[i].next_review);
      const level = flashcards[i].level;

      if (level == 0) continue;

      if (!nearestReviewDate || dateLessThan(next_review, nearestReviewDate))
        nearestReviewDate = next_review;

      if (
        dateGreaterThan(next_review, now) &&
        dateGreaterThan(today, next_review)
      ) {
        reviewCountToday += 1;
      }

      if (
        dateGreaterThan(next_review, today) &&
        dateGreaterThan(tomorrow, next_review)
      ) {
        reviewCountTomorrow += 1;
      }
    }

    if (nearestReviewDate) {
      if (dateLessThan(nearestReviewDate, now)) {
        nextReviewTime = "Available Now";
      } else {
        let nextReviewTimeSec = dateDifferenceSec(nearestReviewDate, now);
        nextReviewTime = nextReviewTimeSec + " Seconds";

        if (nextReviewTimeSec >= 60) {
          nextReviewTime = Math.floor(nextReviewTimeSec / 60) + " Minutes";
        }

        if (nextReviewTimeSec >= 3600) {
          nextReviewTime = Math.floor(nextReviewTimeSec / 3600) + " Hours";
        }

        if (nextReviewTimeSec >= 86400) {
          nextReviewTime = Math.floor(nextReviewTimeSec / 86400) + " Days";
        }

        if (nextReviewTimeSec >= 2628000) {
          nextReviewTime = Math.floor(nextReviewTimeSec / 2628000) + " Months";
        }
      }
    }

    return (
      <main>
        <div className="container flex-vertically">
          <div className="words-level-status flex-horizontally space-equally">
            <div
              className="novice-level words-level-item flex-horizontally
                                      flex-center-vertically space-equally"
            >
              <p>Novice</p>
              <div className="flex">
                <p className="flex-center">{levelCount.novice}</p>
              </div>
            </div>
            <div
              className="proficient-level words-level-item flex-horizontally
                                      flex-center-vertically space-equally"
            >
              <p>Proficient</p>
              <div className="flex">
                <p className="flex-center">{levelCount.proficient}</p>
              </div>
            </div>
            <div
              className="advanced-level words-level-item flex-horizontally
                                      flex-center-vertically space-equally"
            >
              <p>Advanced</p>
              <div className="flex">
                <p className="flex-center">{levelCount.advanced}</p>
              </div>
            </div>
            <div
              className="superior-level words-level-item flex-horizontally
                                      flex-center-vertically space-equally"
            >
              <p>Superior</p>
              <div className="flex">
                <p className="flex-center">{levelCount.superior}</p>
              </div>
            </div>
            <div
              className="burned-level words-level-item flex-horizontally
                                      flex-center-vertically space-equally"
            >
              <p>Burned</p>
              <div className="flex">
                <p className="flex-center">{levelCount.burned}</p>
              </div>
            </div>
          </div>

          <div className="graph-review-info-container">
            <div className="flashcards-graph flex">
              <Graph width={740} height={400} data={flashcards} />
            </div>

            <div className="review-info-container">
              <div className="next-review review-info">
                <div className="flex">
                  <svg
                    className="flex-center"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="clock"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"
                    />
                  </svg>
                </div>
                <div className="flex-vertically">
                  <h4>Next Review</h4>
                  <p>{nextReviewTime}</p>
                </div>
              </div>
              <div className="today-reviews review-info flex-horizontally">
                <div className="flex">
                  <svg
                    className="flex-center"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="calendar-alt"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
                    />
                  </svg>
                </div>
                <div className="flex-vertically">
                  <h4>Today</h4>
                  <p>{reviewCountToday} Reviews</p>
                </div>
              </div>
              <div className="tomorrow-reviews review-info flex-horizontally">
                <div className="flex">
                  <svg
                    className="flex-center"
                    transform="scale(-1, 1)"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="history"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M20 24h10c6.627 0 12 5.373 12 12v94.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H164c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V36c0-6.627 5.373-12 12-12zm321.647 315.235l4.706-6.47c3.898-5.36 2.713-12.865-2.647-16.763L272 263.853V116c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v164.147l84.884 61.734c5.36 3.899 12.865 2.714 16.763-2.646z"
                    />
                  </svg>
                </div>
                <div className="flex-vertically">
                  <h4>Tomorrow</h4>
                  <p>{reviewCountTomorrow} Reviews</p>
                </div>
              </div>
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
    isAuthenticated: state.auth.isAuthenticated,
    flashcards: (state.flashcards.decks.find(x => x._id == id) || {})
      .flashcards,
    loading: state.flashcards.decks.loading
  };
};

export default connect(mapStateToProps)(Dashboard);
