import React from "react";

const TermInformation = props => {
  console.log("PROPS TERMINFO", props);
  const { meaning, reading, definition } = props.flashcard;

  return (
    <div className="term-information-container">
      <div className="flex-horizontally change-vertical">
        <div className="flex-vertically">
          <div className="meaning flex-vertically">
            <h4>Meaning</h4>
            <hr />
            <p>{meaning.join(", ")}</p>
          </div>
          <div className="reading flex-vertically">
            <h4>Reading</h4>
            <hr />
            <p>{reading ? reading.join(", ") : "None"}</p>
          </div>
        </div>
        <div className="definition flex-vertically">
          <h4>Definition</h4>
          <hr />
          <p>{definition ? definition : "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default TermInformation;
