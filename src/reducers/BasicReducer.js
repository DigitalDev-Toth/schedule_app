import { InitialState } from "./InitialState";

/**
 * [LayoutReducer description]
 * @param  {Object} state  [description]
 * @param  {Object} action [description]
 * @return {Object}        [description]
 */
export default function LayoutReducer(state = InitialState, action) {

    switch ( action.type ) {
        case "LAYOUT_CHANGE_DESKS":
            console.log("REDUCER LAYOUT_CHANGE_DESKS")
            return Object.assign({ type: "LAYOUT_CHANGE_DESKS" }, state, {
                desksInScreen: action.desksInScreen,
                operation: action.operation
            });

        case "LAYOUT_BOUNDING_FINISH":
            console.log("REDUCER LAYOUT_BOUNDING_FINISH")
            return Object.assign({ type: "LAYOUT_BOUNDING_FINISH" }, state, {
                desksBoundaries: action.desksBoundaries,
                desksInScreen: action.desksInScreen
            });

        default:
            return state;
    }
}