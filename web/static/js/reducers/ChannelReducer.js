const InitialState = {
    user: '',
    usersRemote: []
}

export function getScheduleChannelReducer(state = InitialState, action) {
    switch (action.type) {
        case 'SCHEDULE_USER_ENTERED': {
            return Object.assign(...state, {
                type: action.type,
                user: action.user,
                message: action.message
            });
        }

        case 'SCHEDULE_USER_REMOTE': {
            console.log(action);
            console.log(state);
            return Object.assign(...state, {
                type: action.type,
                /*usersRemote: action.userRemote*/
            });
        }

        default: {
            return state;
        }
    }
}
