import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { couchServers } from './servers';
import { Verify } from './db.verify';
PouchDB.plugin(PouchFind);

const dbName = 'schedule';
const db = new PouchDB(dbName);

export default class DB {

    static setActiveServer() {
        return new Promise((resolve) => {
            Verify(couchServers)
                .then((server) => {
                    let url = server.url + '/' + dbName;
                    const dbSync = new PouchDB(url, server.auth);
                    console.warn('server online', url);
                    db.sync(dbSync, {
                        live: true,
                        retry: true
                    }).on('complete', function(info) {
                        resolve(info);
                    }).on('paused', function() {
                        resolve(true);
                    }).on('error', function(err) {
                        console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
                    });
                })
                .catch((err) => {
                    console.error('CANT COMPLETE SYNC: ', err);
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
        return new Promise((resolve, reject) => {
            let promises = [
                this.setActiveServer(),
                this.getDefaultOptions(),
                this.getRoom(_id)
            ];
            Promise.all(promises)
                .then(responses => {
                    console.log('asdas');
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
