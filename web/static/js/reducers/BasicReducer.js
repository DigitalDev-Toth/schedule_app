import { InitialState } from '../utilities/InitialState';

/**
 * Redux Reducer
 *
 * Set the Schedule Options actions to Redux Store
 */
export let getScheduleOptionsReducer = (state = InitialState(), action) => {
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
};
