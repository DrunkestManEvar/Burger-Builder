import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('reducer', () => {
  it('should save the initial state if actionType does not match any of the switch cases', () => {
    expect(reducer(undefined, {})).toEqual({
      userId: null,
      tokenId: null,
      error: null,
      isLoading: false,
      authRedirectPath: '/',
    });
  });

  it('should set the provided tokenId and userId on successful login', () => {
    expect(
      reducer(
        {
          userId: null,
          tokenId: null,
          error: null,
          isLoading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          tokenId: 'Hello there',
          userId: 'General Kenobi',
        }
      )
    ).toEqual({
      userId: 'General Kenobi',
      tokenId: 'Hello there',
      error: null,
      isLoading: false,
      authRedirectPath: '/',
    });
  });
});
