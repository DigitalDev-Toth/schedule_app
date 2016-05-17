import ConnectToChannel from './Socket';

const channel = ConnectToChannel();

/**
 * Redux initial state
 */
export function InitialState() {
    return {
        channel,
        optionsDefault: {},
        roomsDefault: {}
    };
}
