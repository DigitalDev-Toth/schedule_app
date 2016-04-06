import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import { NotFound } from '../components/error/NotFound';

/**
 * Error container
 *
 * @class
 */
class ErrorMessage extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        code: PropTypes.any
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
     * React DOM rendering
     */
    render() {
        let error = undefined;
        let code = this.props.code;

        if (code === 404) {
            error = <NotFound code={code} />;
        }

        return (
            <div className='container'>
                <section>{error}</section>
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
        code: state.ScheduleErrorCode.code,
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
)(ErrorMessage);
