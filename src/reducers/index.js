// import { combineReducers } from 'redux';
// import authReducer from './authReducer';
// import interactionReducer from './interactionReducer';

// export default combineReducers({
//   auth: authReducer,
//   interactions: interactionReducer
// });

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
import Auth from './auth';

export default combineReducers({
  Auth,
  router: connectRouter(history)
});