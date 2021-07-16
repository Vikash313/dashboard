import {
    ACTIVITY_TRIGGER,
    BOT_ACTIVITY,
    BOT_ACTIVITY_SUCCESS,
    BOT_ACTIVITY_FAILURE
  } from '../constant/actionType/activity';
  
  export const captureActivity = payload => {
    return {
      type: ACTIVITY_TRIGGER,
      payload,
    }
  };

  export const botActivity = payload => {
    return {
      type: BOT_ACTIVITY,
      payload,
    }
  };

  export const botActivitySuccess = payload => {
    return {
      type: BOT_ACTIVITY_SUCCESS,
      payload,
    }
  };

  export const botActivityFailure = payload => {
    return {
      type: BOT_ACTIVITY_FAILURE,
      payload,
    }
  };