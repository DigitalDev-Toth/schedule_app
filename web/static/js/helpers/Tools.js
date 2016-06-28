import ConnectToChannel from './Socket';

/**
 * Check instance
 *
 * @param      {String}  pathname  The pathname
 * @param      {Object}  instance  The instance
 * @return     {Object}  The instance
 */
export let checkInstance = (pathname, instance) => {
    const path = pathname.split('/');
    const module = getModuleName();

    if (!instance && module === path[1]) {
        return {
            instance: ConnectToChannel(path[1]),
            result: true
        };
    } else if (path.length > 1 && path[1] === '' && 'module:schedule' === instance.topic) {
        return {instance, result: false};
    } else if (path.length > 1 && `module:${path[1]}` === instance.topic) {
        return {instance, result: false};
    } else {
        instance.leave();

        return {
            instance: ConnectToChannel(path[1]),
            result: true
        };
    }
};

/**
 * Gets the module name.
 *
 * @return     {String}  The module name.
 */
export let getModuleName = () => {
    const module = window.module ? window.module : undefined;

    return module;
};
