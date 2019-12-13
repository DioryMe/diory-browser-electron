import * as types from './index';

export const selectLens = (id) => ({ type: types.SELECT_LENS, payload: { id } });
