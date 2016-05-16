import ConnectToChannel from './Socket';
import { API } from '../api';

const room = new API.Model('room');
const optionsDefault = new API.Model('options');
const channel = ConnectToChannel();

let promiseSchedule = [
    optionsDefault.getDocument('default'),
    room.getDocument('1234')
];
/**
 * Redux initial state
 */
export function InitialState() {
    return {
        channel,
        promiseSchedule,
        options: {}
    };
}
