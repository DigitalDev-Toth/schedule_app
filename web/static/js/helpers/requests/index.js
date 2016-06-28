import fetch from 'isomorphic-fetch';
import { getToken } from '../Auth';

/**
 * Default headers.
 *
 * @type       {Object}
 */
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/**
 * Builds a headers.
 *
 * @return     {Object}  The headers.
 */
let buildHeaders = () => {
    return {
        ...defaultHeaders,
        Authorization: getToken()
    };
};

/**
 * Parse json.
 *
 * @param      {Object}  response  The response
 * @return     {Object}  The response json.
 */
let parseJSON = (response) => {
    return response.json();
};

/**
 * Check status.
 *
 * @param      {Object}  response  The response
 * @return     {Object}  The response.
 */
export let checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);

        error.response = response;

        throw error;
    }
};

/**
 * Gets the request.
 *
 * @param      {String}  url     The url
 * @return     {Object}  The request.
 */
export let getRequest = (url) => {
    return fetch(url, {
        headers: buildHeaders()
    })
    .then(checkStatus)
    .then(parseJSON);
};

/**
 * Posts a request.
 *
 * @param      {String}  url     The url
 * @param      {Object}  data    The data
 * @return     {Object}  The request.
 */
export let postRequest = (url, data) => {
    const body = JSON.stringify(data);

    return fetch(url, {
        method: 'post',
        headers: buildHeaders(),
        body
    })
    .then(checkStatus)
    .then(parseJSON);
};

/**
 * Delete a request.
 *
 * @param      {String}  url     The url
 * @return     {Object}  The request.
 */
export let deleteRequest = (url) => {
    return fetch(url, {
        method: 'delete',
        headers: buildHeaders()
    })
    .then(checkStatus)
    .then(parseJSON);
};
