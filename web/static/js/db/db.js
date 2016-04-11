import PouchDB from 'pouchdb';
import setActiveServer from './db.sync';
setActiveServer();

const dbName = 'schedule';
const db = new PouchDB(dbName, { skipSetup: true });

export default class DB {
    static getDoc(doc, type) {
        const search = doc + (type ? type : '');
        return new Promise((resolve, reject) => {
            db.get(search)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static getAll(search) {
        return new Promise((resolve, reject) => {
            db.allDocs({
                include_docs: true,
                startkey: search,
                endkey: search + '\uffff'
            }).then(function(doc) {
                resolve(doc.rows);
            }).catch(function(err) {
                reject(err);
            });
        });
    }
    static getConfig(room) {
        return new Promise((resolve, reject) => {
            let promises = [
                this.getDoc('options/default'),
                this.getDoc('room/', room)
            ];
            Promise.all(promises)
                .then(responses => {
                    let json = {
                        defaultOptions: responses[0].options,
                        roomOptions: responses[1]
                    };
                    resolve(json);
                })
                .catch(err => {
                    reject('error', err);
                });
        });
    }
}
