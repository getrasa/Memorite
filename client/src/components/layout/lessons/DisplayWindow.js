import React from "react";

const DisplayWindow = props => {
  const { current, displayStatus } = props;

  return (
    <div className="review-window flex-vertically">
      <div className="display-content flex">
        <p className="flex-center">{current.term}</p>

        {displayStatus ? (
          <div className="pop-up level-up flex-horizontally">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="arrow-circle-up"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zM126.1 245.1l121.4-121.4c4.7-4.7 12.3-4.7 17 0l121.4 121.4c4.7 4.7 4.7 12.3 0 17l-19.6 19.6c-4.8 4.8-12.5 4.7-17.2-.2L282 211.2V372c0 6.6-5.4 12-12 12h-28c-6.6 0-12-5.4-12-12V211.2l-67.1 70.3c-4.7 4.9-12.4 5-17.2.2l-19.6-19.6c-4.7-4.7-4.7-12.3 0-17z"
              />
            </svg>
            <p>Novice</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="description flex">
        <p className="flex-center">
          {current.meaning ? "TYPE TRANSLATION" : "TYPE READING"}
        </p>
      </div>
    </div>
  );
};

export default DisplayWindow;