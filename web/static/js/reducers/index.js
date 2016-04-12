import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { getScheduleOptionsReducer } from './BasicReducer';
import { getScheduleChannelReducer } from './ChannelReducer';
import { getScheduleErrorCodeReducer } from './ErrorReducer';

const GlobalReducers = combineReducers({
    ScheduleOptions: getScheduleOptionsReducer,
    ScheduleChannel: getScheduleChannelReducer,
    ScheduleErrorCode: getScheduleErrorCodeReducer,
    routing: routerReducer
});

export default GlobalReducers;
