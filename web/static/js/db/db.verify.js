import PouchDB from 'pouchdb';
import { couchServers } from './servers';

const dbName = 'schedule';

export function Verify() {
    return new Promise((resolve, reject) => {
        couchServers.forEach((server) => {
            let url = `${server.url}/${dbName}`;
            console.log(url);
            let db = new PouchDB(url);
            db.info()
                .then((info) => {
                    console.log(info);
                    resolve(server);
                    return;
                }).catch((err) => {
                    reject(err);
                });
        });
    });
}
