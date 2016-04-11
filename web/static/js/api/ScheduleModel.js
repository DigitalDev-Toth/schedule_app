import DB from '../db/db';

export default class ScheduleModel {
    static getConfig(room) {
        return new Promise((resolve, reject) => {
            room = room ? room : '1234';
            DB.getConfig(room)
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static fetchAllSchedules() {}

    static getSchedule() {
        return new Promise((resolve, reject) => {
            DB.getConfig('1234')
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
