import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import PouchAuth from 'pouchdb-authentication';
import { couchServers } from './servers';
import { VerifyServer } from './db.verify';
PouchDB.plugin({ PouchFind, PouchAuth });

const dbName = 'schedule';

export default function verifyAndSync() {
    return new Promise((resolve) => {
        VerifyServer(couchServers)
            .then(PouchSync)
            .then((info) => {
                resolve(info);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
export function PouchSync(server) {
    return new Promise((resolve) => {
        let db = new PouchDB(dbName, { skipSetup: true });
        let url = server.url + '/' + dbName;
        const options = {};
        if (server.auth) {
            options.auth = server.auth ? server.auth : { auth: null };
        }
        options.skipSetup = true;
        options.cache = true;
        const dbSync = new PouchDB(url, options);
        console.info('server online', url);
        db.sync(dbSync, {
            live: true
        }).on('complete', (info) => {
            resolve(info);
        }).on('change', (info) => {
            console.info('DATA CHANGED', info);
        }).on('paused', () => {
            resolve(true);
        }).on('error', (err) => {
            console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
            verifyAndSync(db);
        }).on('denied', (err) => {
            console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
            verifyAndSync(db);
        });
    });
}
