import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Notifier from './Notifier';
/*import Main from '../components/Main';*/
import ScheduleToth from '../components/schedule/ScheduleToth';
import Model from '../models/Model';
import API from '../api';

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

        const room = new Model('room');
        const options = new Model('options');

        API.Docs.getDefaultDocuments(
            [room, options],
            ['1234', 'default'],
            this.props.actions.getScheduleOptions);
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        console.log('default', this.props.optionsDefault, this.props.roomsDefault);

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
    optionsDefault: PropTypes.any,
    roomsDefault: PropTypes.any
};

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
        optionsDefault: state.ScheduleOptions.optionsDefault,
        roomsDefault: state.ScheduleOptions.roomsDefault,
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
