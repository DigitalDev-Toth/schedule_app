import { ChannelInitialState } from '../helpers/InitialStateHelper';

/**
 * Channel reducer
 *
 * @param      {Object}  state   The state
 * @param      {Object}  action  The action
 * @return     {Object}  The next state
 */
let channelReducer = (state = ChannelInitialState(), action) => {
    switch (action.type) {
        case 'UPDATE_INSTANCE': {
            return Object.assign(...state, {
                type: action.type,
                instance: action.payload
            });
        }

        case 'NOTIFICATION': {
            return Object.assign(...state, {
                type: action.type,
                instance: state.instance,
                message: action.payload
            });
        }

        default: {
            return state;
        }
    }
};

export default channelReducer;
