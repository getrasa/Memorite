import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT, RESET_ALERTS } from "../actions/types";

export const setAlert = (msg, alertType, timeout = null) => dispatch => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  if (timeout) {
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  }
};

export const removeAlert = id => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id
  });
};

export const resetAlerts = () => dispatch => {
  dispatch({
    type: RESET_ALERTS,
    payload: null
  });
};
