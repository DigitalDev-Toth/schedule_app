import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Api container
 *
 * @class
 */
class Api extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        channel: PropTypes.any
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
            this.props.channel.push('schedule:api', {api: 'WOOOLA', topic: 'schedule:asdasd'});
            this.props.channel.on('schedule:asdasd', params => {
                console.log(params, "API!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            });
        }
    };

    /**
     * React DOM rendering
     */
    render() {
        return (
            <div className='container'>
                API v1
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
)(Api);
