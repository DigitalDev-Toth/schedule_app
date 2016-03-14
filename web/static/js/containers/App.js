import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';

class App extends Component {
    static propTypes = {
        schedules: PropTypes.object,
        actions: PropTypes.object
    };

/*    static contextTypes = {
        store: PropTypes.object
    };*/

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div>Hello World!</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.loadSchedules
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(scheduleActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
