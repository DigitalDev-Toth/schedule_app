import API from '../api';
import { getModulePathName } from './ToolsHelper';

const _TOKEN_ = 'token';
const _ADMIN_TOKEN_ = 'admintoken';
const _USER_ID_ = 'user';
const _USER_NAME_ = 'username';
const _USER_FULLNAME_ = 'name';

/**
 * Authorization.
 *
 * @param      {Object}    nextState  The next state
 * @param      {Function}  replace    The replace
 * @param      {Function}  next       The next
 */
export let authorization = (nextState, replace, next) => {
    const token = window.token;
    const username = window.username;

    if (!loggedIn(getModulePathName(nextState.location.pathname))) {
        API.Auth.authenticate(nextState, replace, next, token, username);
    } else {
        next();
    }
};

/**
 * Login.
 *
 * @param      {Object}    nextState  The next state
 * @param      {Function}  replace    The replace
 * @param      {Function}  next       The next
 * @param      {Object}    result     The result
 */
export let login = (nextState, replace, next, result) => {
    if (result.token) {
        setToken(result.token);
        setAdminToken(result.admin);
        setUserId(result.user);
        setUserName(result.username);
        setUserFullName(result.name);

        if (!loggedIn(getModulePathName(nextState.location.pathname))) {
            redirect(nextState, replace, 'error');
        }
    } else if (result.error) {
        console.log('TOKEN ERROR', result.error);
        redirect(nextState, replace, 'error');
    }

    next();
};

/**
 * Logged in.
 *
 * @param      {String}   path    The path
 * @return     {Boolean}  The token.
 */
let loggedIn = (path) => {
    if (path === 'looker') {
        return !!getToken() && !!getAdminToken();
    }

    return !!getToken();
};

/**
 * Logout.
 */
export let logout = () => {
    deleteToken();
    deleteUserId();
    deleteUserName();
    deleteUserFullName();
};

/**
 * Redirect.
 *
 * @param      {Object}    nextState  The next state
 * @param      {Function}  replace    The replace
 * @param      {String}    to    The to
 */
export let redirect = (nextState, replace, to) => {
    replace({
        pathname: `/${to}`,
        state: {nextPathname: nextState.location.pathname}
    });
};

/**
 * Gets the token.
 *
 * @return     {String}  The token.
 */
export let getToken = () => {
    return sessionStorage.getItem(_TOKEN_);
    /*return localStorage.getItem(_TOKEN_);*/
};

/**
 * Sets the token.
 *
 * @param      {String}  token   The token
 */
export let setToken = (token) => {
    if (token) {
        sessionStorage.setItem(_TOKEN_, token);
        /*localStorage.setItem(_TOKEN_, token);*/
    }
};

/**
 * Delete the token.
 */
export let deleteToken = () => {
    sessionStorage.removeItem(_TOKEN_);
    /*localStorage.removeItem(_TOKEN_);*/
};

/**
 * Gets the admin token.
 *
 * @return     {String}  The admin token.
 */
export let getAdminToken = () => {
    return sessionStorage.getItem(_ADMIN_TOKEN_);
    /*return localStorage.getItem(_ADMIN_TOKEN_);*/
};

/**
 * Sets the admin token.
 *
 * @param      {String}  adminToken  The admin token
 */
export let setAdminToken = (adminToken) => {
    if (adminToken) {
        sessionStorage.setItem(_ADMIN_TOKEN_, adminToken);
        /*localStorage.setItem(_ADMIN_TOKEN_);*/
    }
};

/**
 * Delete the admin token.
 */
export let deleteAdminToken = () => {
    sessionStorage.removeItem(_ADMIN_TOKEN_);
    /*localStorage.removeItem(_ADMIN_TOKEN_);*/
};

/**
 * Gets the user identifier.
 *
 * @return     {String}  The user identifier.
 */
export let getUserId = () => {
    return sessionStorage.getItem(_USER_ID_);
    /*return localStorage.getItem(_USER_ID_);*/
};

/**
 * Sets the user identifier.
 *
 * @param      {String}  userId  The user identifier
 */
export let setUserId = (userId) => {
    if (userId) {
        sessionStorage.setItem(_USER_ID_, userId);
        /*localStorage.setItem(_USER_ID_, userId);*/
    }
};

/**
 * Delete the user identifier.
 */
export let deleteUserId = () => {
    sessionStorage.removeItem(_USER_ID_);
    /*localStorage.removeItem(_USER_ID_);*/
};

/**
 * Gets the user name.
 *
 * @return     {String}  The user name.
 */
export let getUserName = () => {
    return sessionStorage.getItem(_USER_NAME_);
    /*return localStorage.getItem(_USER_NAME_);*/
};

/**
 * Sets the user name.
 *
 * @param      {String}  username  The username
 */
export let setUserName = (username) => {
    if (username) {
        sessionStorage.setItem(_USER_NAME_, username);
        /*localStorage.setItem(_USER_NAME_, username);*/
    }
};

/**
 * Delete the username.
 */
export let deleteUserName = () => {
    sessionStorage.removeItem(_USER_NAME_);
    /*localStorage.removeItem(_USER_NAME_);*/
};

/**
 * Gets the user full name.
 *
 * @return     {String}  The user full name.
 */
export let getUserFullName = () => {
    return sessionStorage.getItem(_USER_FULLNAME_);
    /*return localStorage.getItem(_USER_FULLNAME_);*/
};

/**
 * Sets the user full name.
 *
 * @param      {String}  name    The name
 */
export let setUserFullName = (name) => {
    if (name) {
        sessionStorage.setItem(_USER_FULLNAME_, name);
        /*localStorage.setItem(_USER_FULLNAME_, name);*/
    }
};

/**
 * Delete the user full name.
 */
export let deleteUserFullName = () => {
    sessionStorage.removeItem(_USER_FULLNAME_);
    /*localStorage.removeItem(_USER_FULLNAME_);*/
};
