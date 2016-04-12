import { API } from '../api';

export let getScheduleOptions = (options) => {
    console.log(API);
    return {
        type: 'SCHEDULE_OPTIONS',
        options
    };
};

export let getScheduleUserEntered = (user) => {
    let message = `Bienvenido ${user}`;

    if (user !== 'toth') {
        message = `El usuario ${user} se ha conectado`;
    }

    return {
        type: 'SCHEDULE_USER_ENTERED',
        user,
        message
    };
};

export let addScheduleOnlookerUserRemote = (usersRemote) => {
    return {
        type: 'SCHEDULE_USER_REMOTE',
        usersRemote
    };
};

export let getScheduleErrorCode = (code = 404) => {
    return {
        type: 'SCHEDULE_ERROR_CODE',
        code
    };
};
