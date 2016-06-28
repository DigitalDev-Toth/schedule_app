import { Socket } from 'phoenix';

const __PRODUCTION__ = process.env.__PRODUCTION__;
const __DEVFULLSTACK__ = process.env.__DEVFULLSTACK__;

/**
 * Connect to channel.
 *
 * @param      {string}                      module    The module
 * @return     {(Function|Socket|string[])}  The channel instance.
 */
let connectToChannel = (module = 'schedule') => {
    if (__PRODUCTION__ || __DEVFULLSTACK__) {
        const socket = new Socket('/socket', {});

        socket.connect();

        const channel = socket.channel(`module:${module}`, {});

        channel.join()
            .receive('ignore', () => {})
            .receive('ok', () => {});

        return channel;
    }

    return;
};

export default connectToChannel;
