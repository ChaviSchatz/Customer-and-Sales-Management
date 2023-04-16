import {createStore} from 'redux';
import { allReducers } from './reducers/combineReducers';

export const store = createStore(
    allReducers
);
store.getState();
