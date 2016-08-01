import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import API from '../api';
import { getUserId } from '../helpers/AuthHelper';
import { checkInstance } from '../helpers/ToolsHelper';
import Notifier from './Notifier';
import Navbar from '../components/navbar';
import Calendar from '../components/calendar';
import CircularProgress from 'material-ui/CircularProgress';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const __PRODUCTION__ = process.env.__PRODUCTION__;
const __DEVFULLSTACK__ = process.env.__DEVFULLSTACK__;

/**
 * Schedule container
 */
class Schedule extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     * @param      {Object}  context  Redux properties
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * React component did mount callback
     */
    componentDidMount() {
        const actions = this.props.actions;

        if (__PRODUCTION__ || __DEVFULLSTACK__) {
            const pathname = this.props.location.pathname;
            const userId = getUserId();
            const { instance, result } = checkInstance(pathname, this.props.instance);

            if (result) {
                actions.updateInstance(instance);
            }

            API.Auth.welcome();
            API.Remote.setRemoteUser();

            instance.on(`welcome__${userId}`, payload => {
                if (userId === payload.id) {
                    actions.notification(payload.message);
                }
            });

            instance.on('entered', payload => {
                if (userId !== payload.id) {
                    actions.notification(payload.message);
                }
            });
        }

        API.Docs.getDefaultDocuments(actions.loadDefaultData);
    }

    /**
     * Gets the child context.
     *
     * @return     {Object}  The child context.
     */
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const options = this.props.options;
        const rooms = this.props.rooms;
        const users = this.props.user;

        if (typeof options == 'object' && !Object.keys(options).length) {
            return (
                <div className='loading text-center'>
                    <div className='cell'>
                        <CircularProgress size={2} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Notifier />
                    <Navbar name='Toth Limitada' options={options} />
                    <Calendar options={options} rooms={rooms} users={users} />
                </div>
            );
        }
    }
}

/**
 * React properties types definitions
 */
Schedule.propTypes = {
    instance: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

/**
 * Material UI context types definitions
 */
Schedule.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

/**
 * Map Redux states to React properties
 *
 * @param      {Object}  state   Redux state
 * @return     {Object}  Redux states
 */
const mapStateToProps = (state) => {
    return {
        instance: state.Channel.instance,
        options: state.Default.options,
        rooms: state.Default.rooms,
        user: state.Default.user,
        state
    };
};

/**
 * Map Redux actions to React properties
 *
 * @param      {Function}  dispatch  Redux action
 * @return     {Object}  Redux actions
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(scheduleActions, dispatch)
    };
};

/**
 * Connect React component with Redux store
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule);
