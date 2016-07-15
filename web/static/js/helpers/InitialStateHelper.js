/**
 * Default initial state
 *
 * @return     {Object}  The initial state
 */
export let DefaultInitialState = () => {
    return {
        options: {},
        rooms: {}
    };
};

/**
 * Channel initial state
 *
 * @return     {Object}  The initial state
 */
export let ChannelInitialState = () => {
    return {
        instance: undefined,
        message: undefined
    };
};

/**
 * Looker initial state
 *
 * @return     {Object}  The initial state
 */
export let LookerInitialState = () => {
    return {
        users: undefined
    };
};
