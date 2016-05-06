const InitialState = {
    user: '',
    usersRemote: []
};

/**
 * Redux Reducer
 *
 * Set the Schedule Channel actions to Redux Store
 */
export let getScheduleChannelReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SCHEDULE_USER_ENTERED': {
            return Object.assign(...state, {
                type: action.type,
                user: action.user,
                message: action.message
            });
        }

        case 'SCHEDULE_USER_REMOTE': {
            return Object.assign(...state, {
                type: action.type,
                usersRemote: action.usersRemote
            });
        }

        default: {
            return state;
        }
    }
};
