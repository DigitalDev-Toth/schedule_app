import { combineReducers } from 'redux';

import OpenModalReducer from './OpenModalReducer';

const GlobalReducers = combineReducers({
    OpenModal: OpenModalReducer
});

export default GlobalReducers;
