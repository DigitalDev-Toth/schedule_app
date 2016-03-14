import { combineReducers } from 'redux';

import { LoadSchedulesReducer } from './BasicReducer';

const GlobalReducers = combineReducers({
    loadSchedules: LoadSchedulesReducer
});

export default GlobalReducers;
