import React from "react";
import { Link } from "react-router-dom";

const SecondaryTopBar = props => {
  const { id, page, goPage, reviews = 0, lessons = 0 } = props;

  return (
    <div id="secondary-top-bar" className="">
      <div className="container">
        <nav className="secondary-navigation">
          <div className="navigation-items-container">
            <Link
              onClick={e => goPage("dashboard")}
              className={`nav-item selectable ${
                page === "dashboard" ? "active" : ""
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                <g clipPath="url(#a)">
                  <rect width="10.454" height="11.947" fill="currentColor" />
                  <rect
                    width="10.454"
                    height="11.947"
                    transform="translate(22 22) rotate(180)"
                    fill="currentColor"
                  />
                  <rect
                    width="10.454"
                    height="7.467"
                    transform="translate(0 14.532)"
                    fill="currentColor"
                  />
                  <rect
                    width="10.454"
                    height="7.467"
                    transform="translate(22 7.468) rotate(180)"
                    fill="currentColor"
                  />
                </g>
              </svg>
              <p>Dashboard</p>
            </Link>
            <Link
              onClick={e => goPage("flashcards")}
              className={`nav-item selectable ${
                page === "flashcards" ? "active" : ""
              } selectable-bar-button flex-horizontally flex-center-vertically`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                <path
                  fill="currentColor"
                  d="M22,11a1.374,1.374,0,0,0-.822-1.265L17.754,8.252l3.423-1.485a1.383,1.383,0,0,0,0-2.529L11.8.17a2.008,2.008,0,0,0-1.6,0L.823,4.237a1.383,1.383,0,0,0,0,2.529L4.246,8.252.823,9.737a1.384,1.384,0,0,0,0,2.53l3.424,1.485L.823,15.237a1.384,1.384,0,0,0,0,2.53L10.2,21.836A2,2,0,0,0,11,22a2.025,2.025,0,0,0,.8-.166l9.378-4.069a1.384,1.384,0,0,0,0-2.53l-3.424-1.485,3.422-1.485A1.374,1.374,0,0,0,22,11ZM10.977,2.06h0ZM11,2.07,18.913,5.5l-7.89,3.441L3.09,5.5ZM18.914,16.5l-7.891,3.441L3.09,16.5l3.747-1.626L10.2,16.336a2,2,0,0,0,.8.167,2.025,2.025,0,0,0,.8-.166l3.364-1.46Zm-7.891-2.06L3.09,11,6.837,9.376,10.2,10.835A2,2,0,0,0,11,11a2.025,2.025,0,0,0,.8-.166l3.364-1.46L18.914,11Z"
                  transform="translate(0 -0.002)"
                />
              </svg>
              <p>Flashcards</p>
            </Link>
            <Link to={`/study/review/${id}`} className="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
              >
                }
                <path
                  fill="currentColor"
                  d="M21.868,70.93A12.228,12.228,0,0,0,11,64,12.23,12.23,0,0,0,.133,70.93a1.289,1.289,0,0,0,0,1.14A12.228,12.228,0,0,0,11,79a12.23,12.23,0,0,0,10.867-6.93,1.289,1.289,0,0,0,0-1.14ZM11,77.125a5.626,5.626,0,0,1,0-11.25,5.626,5.626,0,0,1,0,11.25Zm0-9.375a3.565,3.565,0,0,0-.967.148,1.9,1.9,0,0,1-.18,2.429,1.8,1.8,0,0,1-2.376.184A3.784,3.784,0,0,0,8.971,74.6a3.593,3.593,0,0,0,4.264-.138,3.792,3.792,0,0,0,1.237-4.175A3.665,3.665,0,0,0,11,67.75Z"
                  transform="translate(0 -64)"
                />
              </svg>
              <p>Reviews</p>
              <div class="circular-container flex">
                <p class="flex-center">{reviews}</p>
              </div>
            </Link>
            <Link to={`/study/lessons/${id}`} className="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="14"
                viewBox="0 0 22 14"
              >
                <path
                  fill="currentColor"
                  d="M21.4,67.25l-9.589-3.124a2.6,2.6,0,0,0-1.608,0L.612,67.25a.872.872,0,0,0,0,1.662l1.672.545a2.976,2.976,0,0,0-.615,1.71A1.161,1.161,0,0,0,1.581,73.1L.7,77.288A.575.575,0,0,0,1.24,78H3.169a.575.575,0,0,0,.537-.71L2.828,73.1a1.158,1.158,0,0,0-.062-1.915,1.745,1.745,0,0,1,.711-1.339L10.2,72.037a2.6,2.6,0,0,0,1.608,0L21.4,68.912A.873.873,0,0,0,21.4,67.25Zm-9.266,5.9a3.638,3.638,0,0,1-2.255,0L4.892,71.528,4.4,75.664C4.4,76.953,7.36,78,11,78s6.6-1.045,6.6-2.333l-.487-4.137Z"
                  transform="translate(-0.006 -63.998)"
                />
              </svg>
              <p>Lessons</p>
              <div class="circular-container flex">
                <p class="flex-center">{lessons}</p>
              </div>
            </Link>
          </div>
          <Link
            to={`/study/add/${id}`}
            className="create-button flex-horizontally space-equally flex-center-vertically"
          >
            <p>Create</p>
            <div className="flex">
              <svg
                className="flex-center"
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
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SecondaryTopBar;
