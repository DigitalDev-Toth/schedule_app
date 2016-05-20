import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import GlobalReducers from '../reducers';
import DevTools from '../containers/DevTools';

/**
 * Create Redux Store with Middlewares and Plugins
 */
const createStoreWithMiddlewaresAndPlugins = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
)(createStore);

/**
 * Prepare to creare and configure Redux Store
 */
export default function makeStore(initialState) {
    const store =
        createStoreWithMiddlewaresAndPlugins(GlobalReducers, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }

    return store;
}
