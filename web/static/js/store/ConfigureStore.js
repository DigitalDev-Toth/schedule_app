import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import GlobalReducers from '../reducers';
import DevTools from '../containers/DevTools';

/**
 * Create Redux Store with Middlewares
 */
const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
)(createStore);

/**
 * Prepare to creare and configure Redux Store
 */
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(GlobalReducers, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }

    return store;
}
