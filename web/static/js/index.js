import 'phoenix_html';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import MakeStore from './store/MakeStore';
import App from './containers/App';
import Schedule from './containers/Schedule';
import Looker from './containers/Looker';
/*import Api from './containers/Api';*/
import DevTools from './containers/DevTools';
import NotFound from './components/error/NotFound';
import Forbidden from './components/error/Forbidden';
import { authorization } from './helpers/Auth';
import '../images/ren_y_stimpy.jpg';

const __PRODUCTION__ = process.env.__DEPLOYMENT__;
const __DEVFULLSTACK__ = process.env.__DEVFULLSTACK__;
const __TESTING__ = process.env.__TESTING__;
const store = MakeStore();
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Routing
 */
if (__PRODUCTION__ || __DEVFULLSTACK__) {
    render(
        <div>
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={App}>
                        <IndexRoute component={Schedule} onEnter={authorization} />
                        <Route path='schedule/:token' component={Schedule} onEnter={authorization} />
                        <Route path='looker/:token' component={Looker} onEnter={authorization} />
                        <Route path='error' component={Forbidden} />
                        <Route path='*' component={NotFound} />
                    </Route>
                </Router>
            </Provider>
            { (() => {
                if (!__PRODUCTION__ && !__TESTING__) {
                    return (
                        <Provider store={store}>
                            <DevTools />
                        </Provider>
                    );
                }
            })() }
        </div>,
        document.getElementById('app')
    );
} else {
    render(
        <div>
            <Provider store={store}>
                <Router history={history}>
                    <Redirect from='/schedule' to='/' />
                    <Route path='/' component={App}>
                        <IndexRoute component={Schedule} />
                        <Route path='looker' component={Looker} />
                        <Route path='*' component={NotFound} />
                    </Route>
                </Router>
            </Provider>
            { (() => {
                if (!__PRODUCTION__ && !__TESTING__) {
                    return (
                        <Provider store={store}>
                            <DevTools />
                        </Provider>
                    );
                }
            })() }
        </div>,
        document.getElementById('app')
    );
}
