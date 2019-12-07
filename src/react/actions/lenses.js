import * as types from './actionTypes';

export const selectLens = (id) => ({ type: types.SELECT_LENS, payload: { id } });
