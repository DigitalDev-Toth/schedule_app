import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { LoadSchedulesReducer } from './BasicReducer';

const GlobalReducers = combineReducers({
    loadSchedules: LoadSchedulesReducer,
    routing: routerReducer
});

export default GlobalReducers;
