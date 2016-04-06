import PouchDB from 'pouchdb';
//import { couchServers } from './servers';
//import https from 'https';
import http from 'http';
//import SyncPromise from 'sync-promise';
const couchServers = [{
    'name': 'cloudant',
    'url': 'https://toth.cloudant.com',
    'auth': {
        'username': 'toth',
        'password': 'Mipapajuandijosisualma15'
    }
}, {
    'name': 'toth',
    'url': 'http://toth.cl:5984'
}];
const dbName = 'schedule';

export function Verify() {
    return new Promise((resolve, reject) => {
        validateUrl()
            .then((promises) => {
                Promise.all(promises)
                    .then((responses) => {
                        console.log('primer responses', responses);
                        resolve(responses[0]);
                    })
                    .catch((err) => {
                        console.log('error');
                        reject(err);
                    });
            });
    });
}

function urlStatus() {
    return new Promise((resolve) => {
        const dbPomises = [];
        let responses = [];
        let completedRequests = 0;
        for (var i = 0; i < couchServers.length; i++) {
            const server = couchServers[i];
            http.get(server.url, (response) => {
                if (response.statusCode === 200) {
                    responses.push(response.body);
                    completedRequests++;
                    let url = `${server.url}/${dbName}`;
                    let db = new PouchDB(url, server.auth);
                    if (server.name === 'cloudant') {
                        dbPomises.unshift(db.info());
                    } else {
                        dbPomises.push(db.info());
                    }
                    if (completedRequests === couchServers.length) {
                        resolve(dbPomises);
                    }
                }
            }).on('error', (e) => {
                console.log(e);
            });
        }
    });
}

function validateUrl() {
    return new Promise((resolve, reject) => {
        urlStatus()
            .then((responses) => {
                console.log('otro responses', responses);
                resolve(responses);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
