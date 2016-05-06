import React, { Component } from 'react';
import SlotSchedule from './SlotSchedule';

/**
 * ScheduleGrid component
 *
 * @class      ScheduleGrid (name)
 */
class ScheduleGrid extends Component {
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
     */
    render = () => {
        return (
            <div className='text-center' >
                <div>
                    <SlotSchedule />
                </div>
            </div>
        );
    };
}

export default ScheduleGrid;
