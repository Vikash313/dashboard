import { take, call, put, cancel, takeLatest, fork, all } from 'redux-saga/effects';
import { loginSuccess, logoutFailed, logoutSuccess } from '../actions/auth';
import { LOGIN_USER, LOGOUT_START } from '../constant/actionType/auth';
import AuthenticationService from '../service/authentication';
import { JOBS_ADMIN } from '../constant/actionTypes';

function* loginUser(action) {
  try {
    const { email, password } = action.payload
    const response = yield call(AuthenticationService.login, { email, password });
    if (response.status == 200) {
      yield put(loginSuccess())
    }
  } catch (error) {
    console.trace(error);
  }
}

function* logoutUser(action) {
  try {
    const payload = {
      message: "Log out successfully"
    }
    localStorage.removeItem('email')
    localStorage.removeItem('userType')
    localStorage.removeItem('token')
    yield put(logoutSuccess(payload))
    window.location.href = JOBS_ADMIN + "/"

  } catch (error) {
    const payload = {
      message: "Something went wrong please try again"
    }
    console.trace(error);
    yield put(logoutFailed(payload))
  }
}

export default function* actionWatcher() {
  yield all([
    takeLatest(LOGIN_USER, loginUser),
    takeLatest(LOGOUT_START, logoutUser)
  ])
}
