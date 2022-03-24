import React from "react";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="top-logo-container">
        <img src="..img/icon/memorite-logo-red.svg" classNane="top-logo" />
      </div>
      <h2>Decks</h2>
      <ul>
        <li>All</li>
        <li>Review Ready</li>
      </ul>
    </nav>
  );
};

export default Navbar;
