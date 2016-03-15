import 'phoenix_html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import DevTools from './containers/DevTools';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const store = configureStore();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        { (() => {
            if (!__DEPLOYMENT__) {
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
