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
import DevTools from './containers/DevTools';
import NotFound from './components/error/NotFound';
import Forbidden from './components/error/Forbidden';
import userAuth from './utilities/Auth';
import '../assets/images/ren_y_stimpy.jpg';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;
const __TESTING__ = process.env.__TESTING__;
const store = ConfigureStore();
const history = syncHistoryWithStore(browserHistory, store);
const auth = userAuth();
const ScheduleAccess = auth ? Schedule : Forbidden;
const OnlookerAccess = auth ? Onlooker : Forbidden;
const ApiAccess = auth ? Api : Forbidden;

if (__DEPLOYMENT__ || __PRODUCTION__) {
    render(
        <div>
            <Provider store={store}>
                <Router history={history}>
                    <Redirect from='/schedule' to='/' />
                    <Route path='/' component={App}>
                        <IndexRoute component={Forbidden} />
                        <Route path='schedule'>
                            <Route path=':token' component={ScheduleAccess} />
                        </Route>
                        <Route path='onlooker' component={Forbidden} />
                        <Route path='onlooker'>
                            <Route path=':token' component={OnlookerAccess} />
                        </Route>
                        <Route path='api'>
                            <Route path='v1' component={ApiAccess} />
                        </Route>
                        <Route path='*' component={NotFound} />
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
} else {
    render(
        <div>
            <Provider store={store}>
                <Router history={history}>
                    <Redirect from='/schedule' to='/' />
                    <Route path='/' component={App}>
                        <IndexRoute component={Schedule} />
                        <Route path='schedule'>
                            <Route path=':token' component={Schedule} />
                        </Route>
                        <Route path='onlooker' component={Onlooker} />
                        <Route path='onlooker'>
                            <Route path=':token' component={Onlooker} />
                        </Route>
                        <Route path='api'>
                            <Route path='v1' component={Api} />
                        </Route>
                        <Route path='*' component={NotFound} />
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
}
