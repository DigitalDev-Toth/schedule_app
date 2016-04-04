import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { getScheduleOptionsReducer } from './BasicReducer';
import { getScheduleUserEnteredReducer } from './ChannelReducer';

const GlobalReducers = combineReducers({
    ScheduleOptions: getScheduleOptionsReducer,
    ScheduleUserEntered: getScheduleUserEnteredReducer,
    routing: routerReducer
});

export default GlobalReducers;
