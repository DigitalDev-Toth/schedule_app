import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import Notifier from './Notifier';
/*import Main from '../components/Main';*/
import ScheduleToth from '../components/schedule/ScheduleToth';
import API from '../api';
import { getUserId } from '../helpers/Auth';
import { checkInstance } from '../helpers/Tools';

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
            const {instance, result} = checkInstance(pathname, this.props.instance);

            if (result) {
                actions.updateInstance(instance);
            }

            API.Auth.welcome();

            instance.on(`welcome__${userId}`, (payload) => {
                if (userId === payload.id) {
                    actions.notification(payload.message);
                }
            });

            instance.on('entered', (payload) => {
                if (userId !== payload.id) {
                    actions.notification(payload.message);
                }
            });
        }

        API.Docs.getDefaultDocuments(actions.loadDefaultData);
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        //console.log('default',this.props.optionsDefault,this.props.roomsDefault);
        if (typeof this.props.options == 'object' && !Object.keys(this.props.options).length) {
            return (
                <div>
                    WOOOOOOOOOOOOLA
                </div>
            );
        } else {
            return (
                <div>
                    <Notifier />
                    <ScheduleToth optionsDefault={this.props.options} roomsDefault={this.props.rooms} />
                </div>
            );
        }
    }
}

/**
 * React properties types definitions
 */
Schedule.propTypes = {
    instance: PropTypes.any,
    options: PropTypes.any,
    rooms: PropTypes.any
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
