export let getScheduleErrorCodeReducer = (state = {code: 404}, action) => {
    switch (action.type) {
        case 'SCHEDULE_ERROR_CODE': {
            return Object.assign(...state, {
                type: action.type,
                code: action.code
            });
        }

        default: {
            return state;
        }
    }
};
