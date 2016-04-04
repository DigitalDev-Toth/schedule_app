import { Socket } from 'phoenix';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

let connectToChannel = () => {
    if (__DEPLOYMENT__ || __PRODUCTION__) {
        let socket = new Socket('/socket', {});

        socket.connect();

        let channel = socket.channel('schedule:lobby', {user: 'toth'});

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', (response) => {});

        /*channel.push('schedule:message', {params});

        channel.on('schedule:message', params => {
            console.log(params);
        });*/

        return channel;
    }

    return;
};

export default connectToChannel;
