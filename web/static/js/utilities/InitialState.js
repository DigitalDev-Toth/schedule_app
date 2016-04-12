import ConnectToChannel from './Socket';
//import { API } from '../api';

const channel = ConnectToChannel();

export function InitialState() {
    return {
        channel,
        options: 'testing'
    };
}
