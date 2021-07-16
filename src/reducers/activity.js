import { BOT_ACTIVITY, BOT_ACTIVITY_SUCCESS, BOT_ACTIVITY_FAILURE } from "../constant/actionType/activity";
  
  const initialState = {
    isError: false,
    isLoading: false,
    activity: [],
    message: ''
  };

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOT_ACTIVITY:
        return {
          ...state,
          isLoading: true
        };
      case BOT_ACTIVITY_SUCCESS:
        return {
          ...state,
          isLoading : false,
          isError : false,
          activity: [{...action.payload.data}]
        };
    case BOT_ACTIVITY_FAILURE:
        return {
        ...state,
        isError : true,
        isLoading : false,
        message: action.payload.message
        };
      default:
        return state;
    }
  };
  
  export default activityReducer;
  