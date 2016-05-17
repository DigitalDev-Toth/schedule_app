/*import { API } from '../api';*/

/**
 * Redux Action
 *
 * Get schedule options for draw it
 */
export let getScheduleOptions = (payload) => {
    return {
        type: 'SCHEDULE_DEFAULT_OPTIONS',
        payload
    };
};

/**
 * Redux Action
 *
 * Get the user entered by channel event
 */
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

/**
 * Redux Action
 *
 * Show the list of users connected by channels
 */
export let showScheduleOnlookerUserRemote = (usersRemote) => {
    return {
        type: 'SCHEDULE_USER_REMOTE',
        usersRemote
    };
};
