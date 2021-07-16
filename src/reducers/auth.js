import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_START } from "../constant/actionType/auth";

const initial_state = {
    loading: false,
    signInSuccess: false,
    logOutSuccess: false,
    logOutError: false
};

export default (state = initial_state, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return { 
          ...state,
          loading: false,
          signInSuccess: true,
          signInError: false,
          logOutSuccess: false,
          logOutError:false
        };

      case LOGIN_FAILED:
          return { 
            ...state,
            loading: false,
            signInSuccess: false,
            signInError: true,
            logOutSuccess: false,
            logOutError:false
          };

      case LOGOUT_START:
        return { 
          ...state,
          logOutError: false,
          loading: true,
          logOutSuccess: false,
          signInSuccess: false,
          signInError: false
        };

      case LOGOUT_SUCCESS:
        return { 
          ...state,
          logOutError: false,
          loading: false,
          logOutSuccess: true,
          signInSuccess: false,
          signInError: false
        };

      case LOGOUT_FAILED:
        return { 
          ...state,
          loading: false,
          logOutError: true,
          logOutSuccess: false,
          signInSuccess: false,
          signInError: false
        };

        default: return { ...state };
    }
}
