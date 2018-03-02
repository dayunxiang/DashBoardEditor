/**
 * Created by edeity on 2018/3/1.
 */

import { combineReducers } from 'redux';
import DragReducer from './DragReducer';

const reducers = {
    dragStore: DragReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;