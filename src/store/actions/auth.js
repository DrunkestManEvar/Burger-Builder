import * as actionTypes from './actionTypes';
import axiosAuthInstance from '../../axios/axios-auth';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId,
    userId,
  };
};

export const authLogout = () => {
  localStorage.removeItem('tokenId');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationTime');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = tokenExpirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, tokenExpirationTime * 1000);
  };
};

const authFailure = error => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
  };
};

export const authAttempt = (email, password, isSigningUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axiosAuthInstance
      .post(
        `:${
          isSigningUp ? 'signUp' : 'signInWithPassword'
        }?key=AIzaSyCyMg8Xw8RlO_34N5Cqw8eoFDSWzGSDQSs`,
        authData
      )
      .then(response => {
        const { idToken: tokenId, localId: userId, expiresIn } = response.data;
        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem('tokenId', tokenId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(authSuccess(tokenId, userId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        let { message: errorMessage } = error.response.data.error;
        errorMessage = errorMessage.replaceAll('_', ' ').toLowerCase();
        errorMessage =
          errorMessage[0].toUpperCase() + errorMessage.slice(1).toLowerCase();
        dispatch(authFailure(errorMessage));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckAutoSignIn = () => {
  return dispatch => {
    const tokenId = localStorage.getItem('tokenId');

    if (!tokenId) dispatch(authLogout());
    else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));

      if (expirationTime < new Date()) dispatch(authLogout());
      else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(tokenId, userId));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
