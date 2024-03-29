import React, { Component, PropTypes } from 'react';
import Grid from './grid';
import Layout from './layout';

/**
 * Calendar component
 */
class Calendar extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * On layout change handler
     */
    onLayoutChange() {
        /*console.log('onLayoutChange');*/
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const config = this.props.options;
        const rooms = this.props.rooms;
        const users = this.props.users;

        return (
            <div className='calendar'>
                <Grid config={config} rooms={rooms} users={users} />
                <Layout config={config} rooms={rooms} onLayoutChange={this.onLayoutChange.bind(this)} />
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Calendar.propTypes = {
    options: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

export default Calendar;
