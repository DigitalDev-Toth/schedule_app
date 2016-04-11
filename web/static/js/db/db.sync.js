import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import PouchAuth from 'pouchdb-authentication';
import { couchServers } from './servers';
import { Verify } from './db.verify';
PouchDB.plugin({ PouchFind, PouchAuth });

const dbName = 'schedule';
const db = new PouchDB(dbName, { skipSetup: true });

export default class DB {

    static setActiveServer() {
        return new Promise((resolve) => {
            Verify(couchServers)
                .then((server) => {
                    let url = server.url + '/' + dbName;
                    const options = {};
                    if (server.auth) {
                        options.auth = server.auth ? server.auth : { auth: null };
                    }
                    options.skipSetup = true;
                    options.cache = true;
                    const dbSync = new PouchDB(url, options);
                    console.warn('server online', url);
                    db.sync(dbSync, {
                        live: true
                    }).on('complete', (info) => {
                        resolve(info);
                    }).on('change', (info) => {
                        console.log('DATA CHANGED', info);
                    }).on('paused', () => {
                        resolve(true);
                    }).on('error', (err) => {
                        console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
                        this.setActiveServer();
                    }).on('denied', (err) => {
                        console.error('ERROR WHILE SYNCHRONIZATION IS PERFORMED: ', err);
                        this.setActiveServer();
                    });
                })
                .catch((err) => {
                    console.error('CANT COMPLETE SYNC: ', err);
                });
        });
    }
}
