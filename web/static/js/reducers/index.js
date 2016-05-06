import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { getScheduleOptionsReducer } from './BasicReducer';
import { getScheduleChannelReducer } from './ChannelReducer';

/**
 * Combine all reducers
 */
const GlobalReducers = combineReducers({
    ScheduleOptions: getScheduleOptionsReducer,
    ScheduleChannel: getScheduleChannelReducer,
    routing: routerReducer
});

export default GlobalReducers;
