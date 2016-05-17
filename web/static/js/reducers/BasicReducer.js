import { InitialState } from '../utilities/InitialState';

/**
 * Redux Reducer
 *
 * Set the Schedule Options actions to Redux Store
 */
export let getScheduleOptionsReducer = (state = InitialState(), action) => {
    switch (action.type) {
        case 'SCHEDULE_DEFAULT_OPTIONS': {
            return Object.assign(...state, {
                type: action.type,
                optionsDefault: action.payload[1],
                roomsDefault: action.payload[0]
            });
        }

        default: {
            return state;
        }
    }
};
