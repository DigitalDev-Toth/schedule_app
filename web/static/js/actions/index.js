import { API } from '../api';

export function loadSchedules(schedules) {
    console.log(API);
    return {
        type: 'LOAD_SCHEDULES',
        schedules
    };
}
