import DB from '../db/db';

export default class ScheduleModel {
    static fetchAllSchedules() {}

    static getSchedule() {
        const options = DB.getDefaultOptions();
        console.log(options);
    }

    static newSchedule() {}

    static updateSchedule() {}

    static deleteSchedule() {}
}
