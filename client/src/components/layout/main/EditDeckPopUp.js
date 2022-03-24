import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { update_deck } from "../../../actions/decks";
import { connect } from "react-redux";

const CreateDeckPopUp = ({ update_deck, onClose, deckInfo }) => {
  const [formData, setFormData] = useState({
    title: deckInfo.title,
    native: deckInfo.native,
    language: deckInfo.language
  });

  const { title, language, native } = formData;

  const closePopUp = () => {
    onClose();
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    update_deck({ _id: deckInfo.id, title, native, language });
    closePopUp();
  };

  const onReset = e => {
    e.preventDefault();
    setFormData({
      title: "",
      native: "",
      language: ""
    });
  };

  return (
    <div className="fullscreen-pop-up flex">
      <div className="create-deck-window flex-center">
        <div className="header">
          <h2>Save Deck</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            onClick={e => {
              closePopUp();
            }}
          >
            <path
              fill="currentColor"
              d="M13.334,107l7.051-7.051L21.839,98.5a.55.55,0,0,0,0-.778l-1.556-1.556a.55.55,0,0,0-.778,0L11,104.667,2.5,96.161a.55.55,0,0,0-.778,0L.161,97.717a.55.55,0,0,0,0,.778L8.667,107,.161,115.506a.55.55,0,0,0,0,.778l1.556,1.556a.55.55,0,0,0,.778,0L11,109.334l7.051,7.051,1.454,1.454a.55.55,0,0,0,.778,0l1.556-1.556a.55.55,0,0,0,0-.778Z"
              transform="translate(0 -96)"
            />
          </svg>
        </div>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-field-container">
            <div className="form-field title">
              <p>Title</p>
              <input
                className="form-input"
                type="text"
                name="title"
                value={title}
                onChange={e => {
                  onChange(e);
                }}
                placeholder="Title"
                autoComplete="off"
              />
            </div>
            <div className="form-slide-list-container">
              <div className="form-slide-list">
                <p>Language</p>
                <input
                  className="form-list"
                  placeholder="Studying"
                  list="browsers"
                  name="language"
                  autocomplete="off"
                  value={language}
                  onChange={e => {
                    onChange(e);
                  }}
                />
                <datalist id="browsers">
                  <option value="English"> </option>
                  <option value="Japanese"> </option>
                  <option value="Polish"> </option>
                  <option value="German"> </option>
                  <option value="Spanish"> </option>
                </datalist>
              </div>
              <div className="form-slide-list">
                <p>Language</p>
                <input
                  className="form-list"
                  placeholder="Native"
                  list="browsers"
                  name="native"
                  autocomplete="off"
                  value={native}
                  onChange={e => {
                    onChange(e);
                  }}
                />
                <datalist id="browsers">
                  <option value="English"> </option>
                  <option value="Japanese"> </option>
                  <option value="Polish"> </option>
                  <option value="German"> </option>
                  <option value="Spanish"> </option>
                </datalist>
              </div>
            </div>
          </div>

          <div class="submit-bar">
            <button class="reset-button" onClick={e => onReset(e)}>
              Reset
            </button>
            <input class="submit-button" type="submit" value="Create deck" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  null,
  { update_deck }
)(CreateDeckPopUp);
