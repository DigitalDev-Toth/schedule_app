import 'phoenix_html';
import connectToChannel from './utilities/Socket';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import App from './containers/App';
import Looker from './containers/Looker';
import { ErrorMessage } from './containers/ErrorMessage';
import DevTools from './containers/DevTools';
import '../assets/images/ren_y_stimpy.jpg';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __TESTING__ = process.env.__TESTING__;
const store = ConfigureStore();
const history = syncHistoryWithStore(browserHistory, store);
connectToChannel();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App} />
                <Route path='/schedules' component={App} />
                <Route path='/onlooker' component={Looker} />
                <Route path='*' component={ErrorMessage} code={404} />
            </Router>
        </Provider>
        { (() => {
            if (!__DEPLOYMENT__ && !__TESTING__) {
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
