import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login, setRequestLoading } from "../../actions/auth";
import { resetAlerts } from "../../actions/alert";
import { connect } from "react-redux";

const Login = ({
  login,
  setRequestLoading,
  resetAlerts,
  isAuthenticated,
  authLoading,
  alerts
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    setRequestLoading();
    resetAlerts();

    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/study" />;
  }

  return (
    <div className="login-page">
      <div className={`form-window ${alerts.length === 0 ? "" : "has-alert"}`}>
        <svg
          className="logo"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 115.1 119.3"
          space="preserve"
          fill="currentColor"
        >
          <g id="Logo">
            <path
              className="st0"
              d="M77.9,41C62.1,28.7,47.1,10.6,35.8,0.6c-0.9-0.8-5-0.9-7.4,0.8c-2.9,2.1-2.9,6.6-1.2,8.4
              C40.1,22.9,59,42.7,66.8,48.9c5.1,4.1,8.2,5.3,10.1,5.7c17.1,3.4,25.3,16,25.3,26.5c0,14-11.3,25.8-25.3,25.3
              c-3.6-0.1-7.1-0.9-10.5-2.3c-5.3-2.1-9.1-6.9-11.9-11.7c-2.2-3.8-3.2-13.3-7.4-18.6C40.7,65.8,25.6,51,18.4,44
              c-1.7-1.2-3.9-1.7-6-1.1c-1,0.4-1.9,0.9-2.7,1.7c-2.1,1.9-1.9,6.2-1.3,7.1c6.5,8.9,15.8,15.1,27.7,29.1c2.2,2.5,3,7.1,4.2,11.3
              c3.4,11.9,15.4,27.4,36.6,27.4c21.1,0,38.3-17.1,38.3-38.2c0,0,0-0.1,0-0.1c0.1-4.3-0.6-8.7-2-12.8c-0.2-0.6-2.9-8.1-11.7-16.4
              C91.8,42.9,80.7,43.3,77.9,41z"
            />
            <path
              className="st0"
              d="M76.9,66.6c-8,0-14.5,6.5-14.5,14.5s6.5,14.5,14.5,14.5s14.5-6.5,14.5-14.5S84.9,66.6,76.9,66.6L76.9,66.6z"
            />
            <path
              className="st0"
              d="M11.3,5.6l48.3,48.3c2.6,2.6,2.6,6.8,0,9.4l0,0c-2.6,2.6-6.8,2.6-9.4,0L1.9,15c-2.6-2.6-2.6-6.8,0-9.4l0,0
              C4.5,3,8.7,3,11.3,5.6z"
            />
          </g>
        </svg>
        <h1>Sign In</h1>

        {alerts.map(alert => (
          <div className="alert-box danger">
            <p>{alert.msg}</p>
          </div>
        ))}

        <form onSubmit={e => onSubmit(e)}>
          <div className="form-field">
            <p>Email</p>
            <input
              className="form-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              spellcheck="false"
              required
            />
          </div>
          <div className="form-field">
            <p>Password</p>
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
          </div>
          {authLoading ? (
            <div className="submit active-submit">
              <div>
                <p>Loading</p>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="spinner-third"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <input className="submit" type="submit" value="Sign in" />
          )}
        </form>
        <p>
          <a href="#">Forgot password?</a>
        </p>
        <p>
          No account yet?{" "}
          <Link to={`/register`}>
            <span>Sign up</span>
          </Link>{" "}
          now!
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { login, setRequestLoading, resetAlerts }
)(Login);
