import { InitialState } from '../utilities/InitialState';

export function getScheduleUserEnteredReducer(state = {user: ''}, action) {
    switch (action.type) {
        case 'SCHEDULE_USER_ENTERED': {
            return Object.assign(...state, {
                type: action.type,
                user: action.user,
                message: action.message
            });
        }

        default: {
            return state;
        }
    }
}
