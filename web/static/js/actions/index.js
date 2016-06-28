/**
 * Update instance.
 *
 * @param      {Object}  payload  The payload
 * @return     {Object}  The instance.
 */
export let updateInstance = (payload) => {
    return {
        type: 'UPDATE_INSTANCE',
        payload
    };
};

/**
 * Notification.
 *
 * @param      {String}  payload  The payload
 * @return     {Object}  The message.
 */
export let notification = (payload) => {
    return {
        type: 'NOTIFICATION',
        payload
    };
};

/**
 * Load default data.
 *
 * @param      {Object}  payload  The payload
 * @return     {Object}  The default data.
 */
export let loadDefaultData = (payload) => {
    return {
        type: 'LOAD_DEFAULT_DATA',
        payload
    };
};
