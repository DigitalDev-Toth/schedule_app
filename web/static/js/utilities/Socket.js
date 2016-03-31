import { Socket } from 'phoenix';

/**
 * Connection to phoenix socket system
 */
export default function() {
    const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
    const __PRODUCTION__ = process.env.__PRODUCTION__;

    let socket = undefined;

    if (__DEPLOYMENT__ || __PRODUCTION__) {
        socket = new Socket('/socket', {});

        socket.connect();

        socket.onOpen(event => {/*console.log('OPEN', event, 2)*/});
        socket.onError(event => {/*console.log('ERROR', event, 2)*/});
        socket.onClose(event => {/*console.log('CLOSE', event, 2)*/});

        let channel = socket.channel('schedule:lobby', {user: 'toth'});

        channel.join()
            .receive('ignore', () => {/*console.log('Unable to join', 3)*/})
            .receive('ok', (resp) => console.log('Joined successfully', resp, 3));

        channel.onError(event => {/*console.log('something went wrong', event, 2)*/});
        channel.onClose(event => {/*console.log('channel closed', event, 2)*/});

        channel.push('new:msg', {user: 'moco', body: 'poto'});

        channel.on('new:msg', msg => {
            /*console.log(msg, 4);*/
        });

        channel.on('user:entered', msg => {
            console.log('entered', msg, 5);
        });
    }
}
