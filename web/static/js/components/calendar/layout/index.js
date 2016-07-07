import React, { Component, PropTypes } from 'react';
import {
    getDayPeriodInSeconds,
    getFrequencyInSeconds,
    getCellWidth
} from '../../../helpers/Tools';

/**
 * Layout component
 */
class Layout extends Component {
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
        const config = this.props.config;
        const rooms = this.props.rooms;
        const days = config.options.days_of_week;
        const frequency = getFrequencyInSeconds(rooms.frequency);
        const period = getDayPeriodInSeconds(rooms.init_time, rooms.end_time);
        const cellWidth = getCellWidth(days.length);

        return (
            <div className='calendar-layout'>
                <table>
                    {(() => {
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
                    })()}
                </table>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Layout.propTypes = {
    config: PropTypes.any,
    rooms: PropTypes.any
};

export default Layout;
