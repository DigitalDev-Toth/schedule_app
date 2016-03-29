import { Socket } from 'phoenix';

/**
 * Connect to phoenix socket system
 */
export default function() {
    const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
    const __PRODUCTION__ = process.env.__PRODUCTION__;

    let socket = undefined;

    if (__DEPLOYMENT__ || __PRODUCTION__) {
        socket = new Socket('/socket', {params: {token: window.userToken}});

        socket.connect();

        let channel = socket.channel('schedules:app');

        channel.on('new:schedule', msg => console.log('new:schedule', msg));

        channel.join()
            .receive('ok', resp => { console.log('Joined successfully to Toth Schedule Module', resp); })
            .receive('error', resp => { console.log('Unable to join', resp); });
    }
}
