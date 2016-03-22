import 'phoenix_html';
/*import socket from './socket';*/
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import DevTools from './containers/DevTools';
import '../assets/images/ren_y_stimpy.jpg';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App} />
                {/*<Route path='/schedules' component={App} />*/}
            </Router>
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
