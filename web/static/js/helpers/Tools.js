import ConnectToChannel from './Socket';
import { getUserId } from './Auth';

/**
 * Check instance
 *
 * @param      {String}  pathname  The pathname
 * @param      {Object}  instance  The instance
 * @return     {Object}  The instance
 */
export let checkInstance = (pathname, instance) => {
    const path = getModulePathName(pathname);
    const module = getModuleName();
    const userId = getUserId();

    if (!instance && module === path) {
        return {
            instance: ConnectToChannel(path, userId),
            result: true
        };
    } else if (path === '' && 'module:schedule' === instance.topic) {
        return {instance, result: false};
    } else if (`module:${path}` === instance.topic) {
        return {instance, result: false};
    } else {
        instance.leave();

        return {
            instance: ConnectToChannel(path, userId),
            result: true
        };
    }
};

/**
 * Gets the module path name.
 *
 * @param      {Object}  pathname  The pathname
 * @return     {String}  The module path name.
 */
export let getModulePathName = (pathname) => {
    const path = pathname.split('/');

    return path[1];
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
