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
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        let config = this.props.options;
        let rooms = this.props.rooms;

        console.log('calendar', config, rooms);

        return (
            <div className='calendar'>
                <Grid config={config} rooms={rooms} />
                <Layout config={config} rooms={rooms} />
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Calendar.propTypes = {
    options: PropTypes.any,
    rooms: PropTypes.any
};

export default Calendar;
