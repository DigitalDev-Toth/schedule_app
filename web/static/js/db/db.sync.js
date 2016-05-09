import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import PouchAuth from 'pouchdb-authentication';
import { couchServers } from './servers';
import { VerifyServer } from './db.verify';
PouchDB.plugin({ PouchFind, PouchAuth });

const dbName = 'schedule';

export default function setActiveServer(db) {
    return new Promise((resolve) => {
        VerifyServer(couchServers)
        PouchSync()
            .then((info) => {
                resolve(info);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
export default function PouchSync(server) {
    return new Promise((resolve) => {
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
            setActiveServer(db);
        }).on('denied', (err) => {
            console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
            setActiveServer(db);
        });
    });
}
