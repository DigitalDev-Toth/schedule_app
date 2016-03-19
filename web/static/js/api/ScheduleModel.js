import PouchDB from 'pouchdb';
const db = new PouchDB('http://toth.cl:5984/schedule');

export default class ScheduleModel {
    static fetchAllSchedules() {}

    static getSchedule() {
        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
            console.log(doc.rows);
        });
    }

    static newSchedule() {}

    static updateSchedule() {}

    static deleteSchedule() {}
}
