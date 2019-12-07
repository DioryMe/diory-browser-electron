import * as types from './actionTypes';

export const addDiory = diory => ({ type: types.ADD_DIORY, payload: { diory } });

export const removeDiory = diory => ({ type: types.REMOVE_DIORY, payload: { diory } });

export const udpateDiory = diory => ({ type: types.UPDATE_DIORY, payload: { diory } });

export const filterDiory = filter => ({ type: types.FILTER_DIORY, payload: { filter } });

export const showState = state => ({ type: types.SHOW_STATE, payload: { state } });
