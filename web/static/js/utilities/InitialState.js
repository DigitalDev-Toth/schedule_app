import ConnectToChannel from './Socket';
//import { API } from '../api';

const channel = ConnectToChannel();

/**
 * Redux initial state
 */
export function InitialState() {
    return {
        channel,
        options: 'testing'
    };
}
