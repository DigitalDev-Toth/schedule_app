import React from 'react';
import SlotSchedule from './SlotSchedule';

export default class ScheduleGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='text-center' >
                <div>
                    <SlotSchedule />
                </div>
            </div>
        );
    }
}
