import moment from 'moment';
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

/**
 * Gets the day period in seconds.
 *
 * @param      {String}  initTime  The initialize time
 * @param      {String}  endTime   The end time
 * @return     {Number}  The day period in seconds.
 */
export let getDayPeriodInSeconds = (initTime, endTime) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const initDaySeconds = moment(`${currentDate} ${initTime}`).unix();
    const endDaySeconds = moment(`${currentDate} ${endTime}`).unix();

    return endDaySeconds - initDaySeconds;
};

/**
 * Gets the frequency in seconds.
 *
 * @param      {Number}  frequency  The frequency
 * @return     {Number}  The frequency in seconds.
 */
export let getFrequencyInSeconds = (frequency) => {
    return frequency * 60;
}

/**
 * Gets the cell width.
 *
 * @param      {Number}  days    The days
 * @return     {Number}  The cell width.
 */
export let getCellWidth = (days) => {
    return 100 / days;
}
