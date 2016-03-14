import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import DevTools from './containers/DevTools';

const PRODUCTION = process.env.MODE_ENV === 'production' ? true : false;
const store = configureStore();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        { (() => {
            if (!PRODUCTION) {
                return (
                    <Provider store={store}>
                        <DevTools />
                    </Provider>
                );
            }
        })() }
    </div>,
    document.getElementById('schedule')
);
