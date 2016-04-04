import ConnectToChannel from './Socket';
//import { API } from '../api';

const channel = ConnectToChannel();

export function InitialState() {
    console.log(channel);
    return {
        channel,
        options: 'testing'
    };
}
