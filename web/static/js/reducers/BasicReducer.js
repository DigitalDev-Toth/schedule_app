import { InitialState } from '../utilities/InitialState';

export function getScheduleOptionsReducer(state = InitialState(), action) {
    switch (action.type) {
        case 'SCHEDULE_OPTIONS': {
            return Object.assign(...state, {
                type: action.type,
                options: action.options
            });
        }

        default: {
            return state;
        }
    }
}
