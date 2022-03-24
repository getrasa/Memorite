import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <Link to={"/login"}> Sign in! </Link>
      <p>or</p>
      <Link to={"/register"}> Create new account. </Link>
    </Fragment>
  );
};

export default Landing;
