import { Socket } from 'phoenix';

/**
 * Connection to phoenix socket system
 */
export default function() {
    const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
    const __PRODUCTION__ = process.env.__PRODUCTION__;

    let socket = undefined;

    if (__DEPLOYMENT__ || __PRODUCTION__) {
        /*socket = new Socket('/socket', {params: {token: window.userToken}});

        socket.connect({user_id: "123"})

        socket.onOpen( ev => console.log("OPEN", ev) )
        socket.onError( ev => console.log("ERROR", ev) )
        socket.onClose( e => console.log("CLOSE", e))

        let channel = socket.channel('schedules:app');

        channel.on('new:schedule', msg => console.log('new:schedule', msg));

        channel.join()
            .receive('error', resp => { console.log('Unable to join', resp); })
            .receive('ok', resp => { console.log('Joined successfully to Toth Schedule Module', resp); });*/

        socket = new Socket('/socket', {
            logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data, 1) })
        });

        socket.connect({user_id: '123'});

        socket.onOpen(event => console.log('OPEN', event, 2));
        socket.onError(event => console.log('ERROR', event, 2));
        socket.onClose(event => console.log('CLOSE', event, 2));

        let channel = socket.channel('schedule:lobby', {});

        channel.join()
            .receive('ignore', () => console.log('auth error', 3))
            .receive('ok', () => console.log('join ok', 3));
            /*.after(10000, () => console.log('Connection interruption', 3));*/

        channel.onError(event => console.log('something went wrong', event, 2));
        channel.onClose(event => console.log('channel closed', event, 2));

        channel.push('new:msg', {user: 'moco', body: 'poto'});

        channel.on('new:msg', msg => {
            console.log(msg, 4);
        })

        channel.on('user:entered', msg => {
            console.log(msg, 5);
        })
    }
}
