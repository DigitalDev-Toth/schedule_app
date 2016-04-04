import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { couchServers } from './servers';
import { Verify } from './db.verify';
PouchDB.plugin(PouchFind);

const dbName = 'schedule';
const db = new PouchDB(dbName);
const dbSync = { 'name': 'None', 'dbIndex': 0 };

export default class DB {

    static setActiveServer() {
        return new Promise((resolve, reject) => {
            let url = couchServers[dbSync.dbIndex].url + '/' + dbName;
            dbSync.name = couchServers[dbSync.dbIndex].name;
            db.sync(url, {
                    live: true,
                    retry: true
                })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * { function_description }
     *
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
     * @return     {Promise}  return Object with config
     */
    static getConfigSchedule(_id) {
        console.log('here');
        Verify()
            .then(server => {
                console.log('server', server);
            })
            .catch(err => {
                console.log(err);
            });
        return new Promise((resolve, reject) => {
            let promises = [
                this.setActiveServer(),
                this.getDefaultOptions(),
                this.getRoom(_id)
            ];
            Promise.all(promises)
                .then(responses => {
                    console.log('Sync response ', responses[0]);
                    let json = {
                        defaultOptions: responses[1].options,
                        roomOptions: responses[2]
                    };
                    resolve(json);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
