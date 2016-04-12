import 'phoenix_html';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import App from './containers/App';
import Schedule from './containers/Schedule';
import Onlooker from './containers/Onlooker';
import Api from './containers/Api';
import ErrorMessage from './containers/ErrorMessage';
import DevTools from './containers/DevTools';
import '../assets/images/ren_y_stimpy.jpg';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __TESTING__ = process.env.__TESTING__;
const store = ConfigureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <div>
        <Provider store={store}>
            <Router history={history}>
                <Redirect from='/schedule' to='/' />
                <Route path='/' component={App}>
                    <IndexRoute component={Schedule} />
                    <Route path='onlooker' component={Onlooker} />
                    <Route path='api'>
                        <Route path='v1' component={Api} />
                    </Route>
                    <Route path='*' component={ErrorMessage} />
                </Route>
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
