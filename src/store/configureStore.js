import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import GlobalReducers from '../reducers';
import DevTools from '../containers/DevTools';

const MODE = process.env.MODE_ENV;

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(GlobalReducers, initialState);

    if (MODE === 'development' && module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }

    return store;
}
