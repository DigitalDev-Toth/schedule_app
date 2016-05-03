import { Socket } from 'phoenix';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

let connectToChannel = () => {
    if (__DEPLOYMENT__ || __PRODUCTION__) {
        let socket = new Socket('/socket', {
            params: {
                ip: window.UserRemote.ip,
                token: window.token
            }
        });

        socket.connect();

        let channel = socket.channel('schedule:lobby', {
            user: 'toth',
            userRemote: window.UserRemote,
            token: window.token
        });

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', () => {});

        return channel;
    }

    return;
};

export default connectToChannel;
