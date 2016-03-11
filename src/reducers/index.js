import { combineReducers } from 'redux';

import LayoutReducer from './LayoutReducer';

/**
 * [GlobalReducers description]
 * @type {Object}
 */
const GlobalReducers = combineReducers({

    Layout: LayoutReducer
});

export default GlobalReducers;
