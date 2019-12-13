import * as types from './index';

export const setFocus = focus => ({ type: types.SET_FOCUS, payload: { focus } });

export const goBackward = () => ({ type: types.GO_BACKWARD });

export const goForward = () => ({ type: types.GO_FORWARD });

export const goHome = () => ({ type: types.GO_HOME })
