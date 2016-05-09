import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Notification from '../components/notifier/Notification';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Notifier container
 */
class Notifier extends Component {
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
            this.props.channel.on('schedule:user_entered', params => {
                this.props.actions.getScheduleUserEntered(params.user);
            });
        }
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        let userEntered = this.props.userEntered;
        let show = false;
        let message = this.props.message;

        if (userEntered !== '') {
            show = true;
        }

        return (
            <div>
                <Notification show={show} message={message} />
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Notifier.propTypes = {
    channel: PropTypes.any,
    userEntered: PropTypes.any
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
        message: state.ScheduleChannel.message,
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
)(Notifier);
