import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Main from '../components/Main';
import Notifier from '../components/notification/Notifier';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Schedule container
 *
 * @class
 */
class Schedule extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        channel: PropTypes.any,
        userEntered: PropTypes.any
    };

    /*static contextTypes = {
        store: PropTypes.object
    };*/

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
            this.props.channel.on('schedule:user_entered', params => {
                this.props.actions.getScheduleUserEntered(params['user']);
            });
        }
    }

    /**
     * React DOM rendering
     */
    render = () => {
        let userEntered = this.props.userEntered;
        let open = false;
        let message = this.props.message;

        if (userEntered !== '') {
            open = true;
        }

        return (
            <div>
                <Main />
                <Notifier open={open} message={message} />
            </div>
        );
    }
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
        userEntered: state.ScheduleUserEntered.user,
        message: state.ScheduleUserEntered.message,
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
