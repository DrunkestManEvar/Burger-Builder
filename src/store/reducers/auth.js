import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  userId: null,
  tokenId: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { isLoading: true, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        error: null,
        tokenId: action.tokenId,
        userId: action.userId,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { userId: null, tokenId: null });
    case actionTypes.AUTH_FAILURE:
      return updateObject(state, { isLoading: false, error: action.error });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};

export default reducer;
