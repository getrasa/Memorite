import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { mapLevelToName, mapLevelToColor } from "../../../helper/functions";

const DeckItem = props => {
  const { term, meaning, reading, level } = props.data;
  let levelName = mapLevelToName(level);
  levelName = levelName.charAt(0).toUpperCase() + levelName.slice(1);
  return (
    <div className="flashcard-list-item">
      <input type="checkbox" />
      <p>{term}</p>
      <p>{meaning[0]}</p>
      <p>{reading[0] || "None"}</p>
      <p>{levelName}</p>

      <div className="color" style={{ background: mapLevelToColor(level) }} />
    </div>
  );
};

DeckItem.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
  id: PropTypes.string
};

export default DeckItem;
