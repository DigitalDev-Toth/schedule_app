import PouchDB from 'pouchdb';
import { couchServers } from './servers';

const dbName = 'schedule';

export function Verify() {
    return new Promise((resolve, reject) => {
        couchServers.forEach((server) => {
            let url = `${server.url}/${dbName}`;
            let db = new PouchDB(url, server.auth);
            db.info()
                .then(() => {
                    resolve(server);
                    return;
                }).catch((err) => {
                    reject(err);
                });
        });
    });
}
