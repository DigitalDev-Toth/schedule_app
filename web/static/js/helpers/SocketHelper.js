import { Socket } from 'phoenix';

const __PRODUCTION__ = process.env.__PRODUCTION__;
const __DEVFULLSTACK__ = process.env.__DEVFULLSTACK__;

/**
 * Connects to channel.
 *
 * @param      {String}                      module  The module
 * @param      {String}                      userId  The user identifier
 * @return     {(Function|Socket|string[])}  The channel instance.
 */
let connectToChannel = (module = 'schedule', userId) => {
    if (__PRODUCTION__ || __DEVFULLSTACK__) {
        const socket = new Socket('/socket', {});

        socket.connect();

        const channel = socket.channel(`module:${module}`, {key: userId});

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', () => {});

        return channel;
    }

    return;
};

export default connectToChannel;
