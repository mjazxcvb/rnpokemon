import {DispatchAction} from '../interfaces';
import {
  APP_LOGIN,
  APP_LOGOUT,
  APP_RESET,
  APP_SET_STATE,
  REGISTER,
} from './actions';
import {initialState} from './initialState';

export const appReducer = (state = initialState, action: DispatchAction) => {
  switch (action.type) {
    case APP_LOGIN: {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    }
    case APP_LOGOUT: {
      return {
        ...state,
        loggedInUser: null,
      };
    }
    case REGISTER: {
      return {
        ...state,
        users: state?.users
          ? state.users.concat(action.payload)
          : [action.payload],
        loggedInUser: action.payload,
      };
    }
    case APP_SET_STATE: {
      return action.payload;
    }
    case APP_RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
