import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { getScheduleOptionsReducer } from './BasicReducer';
import { getScheduleUserEnteredReducer } from './ChannelReducer';
import { getScheduleErrorCodeReducer } from './ErrorReducer';

const GlobalReducers = combineReducers({
    ScheduleOptions: getScheduleOptionsReducer,
    ScheduleUserEntered: getScheduleUserEnteredReducer,
    ScheduleErrorCode: getScheduleErrorCodeReducer,
    routing: routerReducer
});

export default GlobalReducers;
