import http from 'http';
import https from 'https';

export function VerifyServer(couchServers) {
    return new Promise((resolve, reject) => {
        urlStatus(couchServers)
            .then((server) => {
                if (typeof server[0] === 'object') {
                    resolve(server[0]);
                }
            })
            .catch((err) => {
                reject(err);
            });

    });
}

function urlStatus(couchServers) {
    return new Promise((resolve, reject) => {
        let completedRequests = 0;
        const serversOnline = [];
        for (var i = 0; i < couchServers.length; i++) {
            const server = couchServers[i];
            let serverQuery = (server.ssl) ? https : http;
            serverQuery.get(server.url, (response) => {
                completedRequests++;
                if (server.name === 'cloudant' && response.statusCode === 200) {
                    server.status = response.statusCode;
                    serversOnline.unshift(server);
                } else if (response.statusCode === 200) {
                    server.status = response.statusCode;
                    serversOnline.push(server);
                }
                if (completedRequests === couchServers.length) {
                    if (serversOnline.length > 0) {
                        resolve(serversOnline);
                    } else {
                        reject('ALL SERVERS OFFLINE');
                    }
                }
            });
        }
    });
}
