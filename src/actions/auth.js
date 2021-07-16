import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../constant/actionType/auth';

export const loginUser = payload => {
  return {
    type: LOGIN_USER,
    payload,
  }
};

export const loginSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  }
};

export const logoutSuccess = payload => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  }
};

export const logoutStart = payload => {
  return {
    type: LOGOUT_START,
    payload,
  }
};

export const logoutFailed = payload => {
  return {
    type: LOGOUT_FAILED,
    payload,
  }
};