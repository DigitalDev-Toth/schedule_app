import { Socket } from 'phoenix';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

let connectToChannel = () => {
    if (__DEPLOYMENT__ || __PRODUCTION__) {
        let socket = new Socket('/socket', {
            params: {
                ip: window.UserRemote === undefined ? 1 : window.UserRemote.ip,
                token: window.ChannelToken
            }
        });

        socket.connect();

        let channel = socket.channel('schedule:lobby', {
            user: 'toth',
            userRemote: window.UserRemote,
            token: window.ChannelToken
        });

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', () => {});

        return channel;
    }

    return;
};

export default connectToChannel;
