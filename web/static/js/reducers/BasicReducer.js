import { InitialState } from '../utilities/InitialState';

export function LoadSchedulesReducer(state = InitialState(), action) {
    switch (action.type) {
        case 'LOAD_SCHEDULES': {
            return Object.assign({ type: 'LOAD_SCHEDULES' }, state, {
                schedules: action.schedules
            });
        }

        default: {
            return state;
        }
    }
}
