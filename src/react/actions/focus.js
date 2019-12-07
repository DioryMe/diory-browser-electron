import * as types from './actionTypes';

export const setFocus = focus => ({ type: types.SET_FOCUS, payload: { focus } });

export const goBackward = focus => ({ type: types.GO_BACKWARD });

export const goForward = focus => ({ type: types.GO_FORWARD });
