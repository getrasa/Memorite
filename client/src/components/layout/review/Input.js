import React, { useState } from "react";
import { toHiragana } from "wanakana";

const Input = props => {
  const [state, setState] = useState({
    input: ""
  });

  const setStyle = {
    question: "",
    correct: "input-correct",
    incorrect: "input-incorrect"
  };

  const { isCurrentMeaning, style } = props;

  const onChange = e => {
    if (isCurrentMeaning) setState({ input: e.target.value });
    else {
      const input = toHiragana(e.target.value, {
        customKanaMapping: { n: "n", nn: "ん" }
      });
      setState({ input });
    }
  };

  console.log("SET STYLE", setStyle);

  return style === "question" ? (
    <div className="input-container">
      <input
        className={setStyle[style]}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder={isCurrentMeaning ? "Answer" : "答え"}
        name="input"
        value={state.input}
        onChange={onChange}
        onKeyPress={event => {
          if (event.key === "Enter") {
            props.onEnter(state.input);
          }
        }}
      />

      <button
        className="button-next flex"
        onClick={event => {
          props.onEnter(state.input);
        }}
      >
        <svg
          className="flex-center"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </button>
    </div>
  ) : (
    <div className="input-container">
      <input
        className={setStyle[style]}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder={isCurrentMeaning ? "Answer" : "答え"}
        name="input"
        value={state.input}
        onKeyPress={event => {
          if (event.key === "Enter") {
            props.setNextFlashcard(state.input);
            setState({ input: "" });
          }
        }}
      />

      <button
        className="button-next flex"
        onClick={event => {
          props.setNextFlashcard(state.input);
          setState({ input: "" });
        }}
      >
        <svg
          className="flex-center"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="#ffffff"
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Input;
