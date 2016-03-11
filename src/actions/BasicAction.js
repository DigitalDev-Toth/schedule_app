/**
 * [changeDesks description]
 * @param  {Integer} desksInScreen [description]
 * @param  {Integer} operation     [description]
 * @return {Object}                [description]
 */
export function changeDesks(desksInScreen, operation) {
    console.log("ACTION changeDesks")
    console.log(desksInScreen, operation)
    return {
        type: "LAYOUT_CHANGE_DESKS",
        desksInScreen,
        operation
    };  
}

/**
 * [boundingFinish description]
 * @param  {Array} desksBoundaries [description]
 * @return {Object}                [description]
 */
export function boundingFinish(desksBoundaries) {
    console.log("ACTION boundingFinish")
    console.log(desksBoundaries)
    return {
        type: "LAYOUT_BOUNDING_FINISH",
        desksInScreen: desksBoundaries.length,
        desksBoundaries
    }
}