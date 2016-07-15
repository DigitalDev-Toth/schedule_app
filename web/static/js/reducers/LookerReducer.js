import { LookerInitialState } from '../helpers/InitialStateHelper';

/**
 * Looker reducer
 *
 * @param      {Object}  state   The state
 * @param      {Object}  action  The action
 * @return     {Object}  The next state
 */
let lookerReducer = (state = LookerInitialState(), action) => {
    switch (action.type) {
        case 'LOAD_REMOTE_USERS': {
            return Object.assign(...state, {
                type: action.type,
                users: action.payload
            });
        }

        default: {
            return state;
        }
    }
};

export default lookerReducer;
