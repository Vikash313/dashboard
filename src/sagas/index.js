import { all } from 'redux-saga/effects'

import authSagas from './auth';

export default function* IndexSagas() {
  yield all([
    authSagas(),
  ])
}