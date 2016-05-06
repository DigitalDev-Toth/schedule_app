import { Socket } from 'phoenix';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Connection to Phoenix Channel by Websocket configuration
 *
 * @return     {(Function|Socket|string[])}  { description_of_the_return_value }
 */
let connectToChannel = () => {
    if (__DEPLOYMENT__ || __PRODUCTION__) {
        let socket = new Socket('/socket', {
            params: {
                schedule: window.ScheduleToken === undefined ? 1 : window.ScheduleToken,
                token: window.ChannelToken
            }
        });

        socket.connect();

        let channel = socket.channel('schedule:lobby', {
            user: 'toth',
            scheduleToken: window.ScheduleToken,
            channelToken: window.ChannelToken
        });

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', () => {});

        return channel;
    }

    return;
};

export default connectToChannel;
