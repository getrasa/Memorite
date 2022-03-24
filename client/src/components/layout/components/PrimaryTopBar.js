import React from "react";

const PrimaryTopBar = ({ title, toggleMobileSideNav }) => {
  return (
    <div class="primary-top-bar">
      <div class="container">
        <div class="hamburger-menu" onClick={() => toggleMobileSideNav()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.002 17.996">
            <path
              fill="currentColor"
              d="M19659-9738v-2h24v2Zm0-8v-2h24v2Zm0-8v-2h24v2Z"
              transform="translate(-19658.998 9755.998)"
            />
          </svg>
        </div>

        <h1 class="branding-name">Memorite</h1>

        <div class="deck-label flex">
          <p class="flex-center">Deck</p>
        </div>

        <p className="deck-name">{title ? title : ""}</p>
      </div>
    </div>
  );
};

export default PrimaryTopBar;
