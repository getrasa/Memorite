import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register, setRequestLoading } from "../../actions/auth";
import { resetAlerts, setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const Register = ({
  register,
  resetAlerts,
  setRequestLoading,
  authLoading,
  isAuthenticated,
  alerts
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    resetAlerts();
    if (password !== password2) {
      setAlert("Passwords do not match");
    } else {
      setRequestLoading();
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/study" />;
  }

  return (
    <Fragment>
      <div className="login-page">
        <div
          className={`form-window ${alerts.length === 0 ? "" : "has-alert"}`}
        >
          <div className="header">
            <Link to="/login" className="return-button">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-left"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                />
              </svg>
            </Link>
            <h1>Register</h1>
          </div>

          {alerts.map(alert => (
            <div className="alert-box danger">
              <p>{alert.msg}</p>
            </div>
          ))}

          <form onSubmit={e => onSubmit(e)}>
            <div className="form-field">
              <p>Username</p>
              <input
                className="form-input"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-field">
              <p>Email</p>
              <input
                className="form-input"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
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

            <div className="form-field">
              <p>Password</p>
              <input
                className="form-input"
                type="password"
                placeholder="Repeat password"
                name="password2"
                value={password2}
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
              <input className="submit" type="submit" value="Sign up" />
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { register, resetAlerts, setRequestLoading }
)(Register);
