import DB from '../db/db';

export default class ScheduleModel {
    static fetchAllSchedules() {}

    static getSchedule() {
        return new Promise((resolve, reject) => {
            DB.getConfigSchedule('1234')
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static newSchedule() {}

    static updateSchedule() {}

    static deleteSchedule() {}
}
