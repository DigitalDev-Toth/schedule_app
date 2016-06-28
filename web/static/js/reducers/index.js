import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import defaultReducer from './DefaultReducer';
import channelReducer from './ChannelReducer';
import lookerReducer from './LookerReducer';

/**
 * Combine all reducers
 */
const GlobalReducers = combineReducers({
    Default: defaultReducer,
    Channel: channelReducer,
    Looker: lookerReducer,
    routing: routerReducer
});

export default GlobalReducers;
