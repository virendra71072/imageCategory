import {
  LOGIN,
  SAVE_USER_DETAILS,
  LOGIN_PAGE_UNLOADED,
  SAVE_USER_IMAGES
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case SAVE_USER_DETAILS:
      return { ...state, userDetails: action.userDetails };
    case SAVE_USER_IMAGES:
      return { ...state, imageList: action.imageList };
    case LOGIN_PAGE_UNLOADED:
      //return { };
    default:
      return {...state};
  }

  return state;
};
