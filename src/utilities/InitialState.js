import { API } from '../api';

export function InitialState(api = API) {
    console.log(api);
    return {
        message: 'testing'
    };
}
