import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { couchServers } from './servers';

const dbName = 'schedule';
const db = new PouchDB(dbName);
const dbSync = { 'name': 'None', 'dbIndex': 0 };

export default class DB {

    static setActiveServer() {
        var url = couchServers[dbSync.dbIndex].url + '/' + dbName;
        dbSync.name = couchServers[dbSync.dbIndex].name;
        db.sync(url, {
            live: true,
            retry: true
        }).on('change', function (info) {
            console.log('change ', dbSync.name ,info);
        }).on('paused', function () {
            console.log('paused ', dbSync.name);
        }).on('active', function () {
            console.log('active ', dbSync.name);
        }).on('denied', function (info) {
            console.log('denied ', dbSync.name, info);
        }).on('complete', function (info) {
            console.log('complete ', dbSync.name, info);
        }).on('error', function (err) {
            console.log('error ', dbSync.name, err);
            dbSync.dbIndex += 1;
            this.setActiveServer();
        });
    }

    /**
     * { function_description }
     *
     * @method     getDefaultOptions
     * @return     {Promise}  { description_of_the_return_value }
     */
    static getDefaultOptions() {
        return new Promise((resolve, reject) => {
            db.get('options/default')
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * { function_description }
     *
     * @method     getRoom
     * @param      {<type>}   id      { description }
     * @return     {Promise}  { description_of_the_return_value }
     */
    static getRoom(id) {
        return new Promise((resolve, reject) => {
            db.get(`room/${id}`)
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Promise.all
     *
     * @method     getConfigSchedule
     * @param         _id
     * @return     {Promise}  return Object with config
     */
    static getConfigSchedule(_id) {
        this.setActiveServer();
        return new Promise((resolve, reject) => {
            let promises = [this.getDefaultOptions(), this.getRoom(_id)];
            Promise.all(promises)
                .then(responses => {
                    let json = {
                        defaultOptions: responses[0].options,
                        roomOptions: responses[1]
                    };
                    resolve(json);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
