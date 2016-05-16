import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Notifier from './Notifier';
/*import Main from '../components/Main';*/
import ScheduleToth from '../components/schedule/ScheduleToth';
import { API } from '../api';

let user = new API.Model('user');
user.getDocument('username1')
    .then((data) => {
        console.log(data);
    });
//user.getDoc('username1');

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

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
     * React component did mount
     */
    componentDidMount() {
        if (__DEPLOYMENT__ || __PRODUCTION__) {
            this.props.channel.on('schedule:user_entered', () => {
                this.props.channel.push('schedule:onlooker', {onlooker: true});
            });
        }
        this.props.actions.getScheduleOptions(this.props.scheduleOptions);
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        if(this.props.state.ScheduleOptions.type) {
            console.log('holi actions', this.props.state.ScheduleOptions.options);
        }
        return (
            <div>
                <ScheduleToth />
                <Notifier />
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Schedule.propTypes = {
    channel: PropTypes.any,
    userEntered: PropTypes.any,
    scheduleOptions: PropTypes.any,
    options: PropTypes.any
};

/**
 * Map Redux states to React properties
 *
 * @param      {Object}  state   Redux state
 * @return     {Object}  Redux states
 */
const mapStateToProps = (state) => {
    return {
        scheduleOptions: state.ScheduleOptions.promiseSchedule,
        channel: state.ScheduleOptions.channel,
        userEntered: state.ScheduleChannel.user,
        options: state.ScheduleOptions.options,
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
