import React, { Component } from 'react';
import SlotSchedule from './SlotSchedule';

/**
 * ScheduleGrid component
 */
class ScheduleGrid extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        this.state = {
            optionsDefault: this.props.optionsDefault,
            roomsDefault: this.props.roomsDefault
        };
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <div className='text-center' >
                <div>
                    <SlotSchedule optionsDefault={this.props.optionsDefault} roomsDefault={this.props.roomsDefault}/>
                </div>
            </div>
        );
    }
}

export default ScheduleGrid;
