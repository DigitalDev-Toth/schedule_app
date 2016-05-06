import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Notifier from './Notifier';
/*import Main from '../components/Main';*/
import ScheduleToth from '../components/schedule/ScheduleToth';
import { API } from '../api';
API.ScheduleModel.getSchedule()
    .then((doc) => {
        console.log(doc);
    }).catch((err) => {
        console.log('error', err);
    });
API.UserModel.getUser('username2')
    .then((doc) => {
        console.log('user', doc);
    }).catch((err) => {
        console.log('error', err);
    });
API.UserModel.getSchema('user')
    .then((doc) => {
        console.log('user', doc);
    }).catch((err) => {
        console.log('error', err);
    });

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Schedule container
 *
 * @class      Schedule (name)
 */
class Schedule extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        channel: PropTypes.any,
        userEntered: PropTypes.any
    };

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
     * React component did mount
     */
    componentDidMount = () => {
        if (__DEPLOYMENT__ || __PRODUCTION__) {
            this.props.channel.on('schedule:user_entered', () => {
                this.props.channel.push('schedule:onlooker', {onlooker: true});
            });
        }
    };

    /**
     * React DOM rendering
     */
    render = () => {
        return (
            <div>
                <ScheduleToth />
                <Notifier />
            </div>
        );
    };
}

/**
 * Map Redux states to React properties
 *
 * @param      {Object}  state   Redux state
 * @return     {Object}  Redux states
 */
const mapStateToProps = (state) => {
    return {
        channel: state.ScheduleOptions.channel,
        userEntered: state.ScheduleChannel.user,
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
