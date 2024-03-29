import React, { Component, PropTypes } from 'react';
import {
    getDayPeriodInSeconds,
    getFrequencyInSeconds,
    getCellWidth
} from '../../../helpers/ToolsHelper';

/**
 * Grid component
 */
class Grid extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Gets the times spaces.
     *
     * @param      {Number}  period     The period
     * @param      {Number}  frequency  The frequency
     * @return     {Array}   The times spaces.
     */
    getTimesSpaces(period, frequency) {
        let rows = [];

        for (let i = 0; i < period; i += frequency) {
            rows.push(
                <tr>
                    <td></td>
                </tr>
            );
        }

        return rows;
    }

    /**
     * Gets the events spaces.
     *
     * @param      {Number}  period     The period
     * @param      {Number}  frequency  The frequency
     * @param      {Array}   days       The days
     * @param      {Number}  cellWidth  The cell width
     * @return     {Array}   The events spaces.
     */
    getEventsSpaces(period, frequency, days, cellWidth) {
        let rows = [];
        for (let i = 0; i < period; i += frequency) {
            rows.push(
                <tr>
                    {days.map(() => {
                        return (
                            <td style={{width: `${cellWidth}%`}}></td>
                        );
                    })}
                </tr>
            );
        }

        return rows;
    }
    setColorEventSpaces(rooms, users, frequency) {
        const schedule = users.schedule[0];
        const initSchedule = getDayPeriodInSeconds(rooms.init_time, schedule.itime);
        const periodSchedule = getDayPeriodInSeconds(schedule.itime, schedule.ftime);
        const endSchedule = initSchedule + periodSchedule;
        console.log(initSchedule,  frequency, endSchedule, );
    }
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const config = this.props.config;
        const rooms = this.props.rooms;
        const users = this.props.users;
        const days = config.options.days_of_week;
        const frequency = getFrequencyInSeconds(rooms.frequency);
        const period = getDayPeriodInSeconds(rooms.init_time, rooms.end_time);
        const cellWidth = getCellWidth(days.length);

        return (
            <div className='calendar-grid'>
                <div className='times'>
                    <table>
                        {this.getTimesSpaces(period, frequency)}
                    </table>
                </div>
                <div className='events'>
                    <table>
                        {this.getEventsSpaces(period, frequency, days, cellWidth)}
                        {this.setColorEventSpaces(rooms, users, frequency)}
                    </table>
                </div>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Grid.propTypes = {
    config: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

export default Grid;
