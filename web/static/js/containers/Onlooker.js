import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Onlooker Container
 *
 * @class
 */
class Onlooker extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        channel: PropTypes.any,
        usersRemote: PropTypes.any
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
            this.props.channel.on('schedule:onlooker', params => {
                this.props.actions.addScheduleOnlookerUserRemote(params.usersRemote);
            });
        }
    };

    /**
     * React DOM rendering
     */
    render() {
        let usersRemote = this.props.usersRemote === undefined ? [] : this.props.usersRemote;

        console.log(usersRemote);
        return (
            <div>

                Hello World!
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
        usersRemote: state.ScheduleChannel.usersRemote,
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
)(Onlooker);
