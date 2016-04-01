import DB from '../db/db';

export default class ScheduleModel {
    static fetchAllSchedules() {}

    static getSchedule() {
        DB.getConfigSchedule('1234')
            .then((doc) => {
                console.log(doc);
            }).catch((err) => {
                console.log(err);
            });
    }

    static newSchedule() {}

    static updateSchedule() {}

    static deleteSchedule() {}
}
