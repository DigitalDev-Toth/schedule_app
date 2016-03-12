/*import { InitialState } from "./InitialState";*/

export default function OpenModalReducer(state = InitialState, action) {
    switch ( action.type ) {
        case "OPEN_MODAL":
            return Object.assign({ type: "OPEN_MODAL" }, state, {
                scheduleId: action.scheduleId
            });

        default:
            return state;
    }
}
