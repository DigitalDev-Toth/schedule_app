import Model from '../models/Model';
import { postRequest } from '../helpers/requests';
import {
    login,
    getToken,
    getAdminToken,
    getUserId,
    getUserName,
    getUserFullName
} from '../helpers/Auth';

/**
 * Authenticate
 *
 * @param      {Object}    nextState  The next state
 * @param      {Function}  replace    The replace
 * @param      {Function}  next       The next
 * @param      {String}    token      The token
 * @param      {String}    username   The username
 */
export let authenticate = (nextState, replace, next, token, username) => {
    const scheme = new Model('user');
    const doc = username;

    scheme.getDocument(doc)
    .then(user => {
        const data = {
            session: {
                token,
                user
            }
        };

        postRequest('/api/v1/auth/sessions', data)
        .then(result => {
            login(nextState, replace, next, result);
        })
        .catch(error => {
            console.log('AUTH ERROR', error);
            const result = {
                error: 'invalid auth'
            };

            login(nextState, replace, next, result);
        });
    })
    .catch(error => {
        console.log('USER ERROR', error);
        const result = {
            error: 'invalid user'
        };

        login(nextState, replace, next, result);
    });
};

/**
 * Welcome
 */
export let welcome = () => {
    const data = {
        token: getToken(),
        id: getUserId(),
        name: getUserFullName()
    };
    let promises = [
        postRequest('/api/v1/message/welcome', data),
        postRequest('/api/v1/message/entered', data)
    ];

    Promise.all(promises)
    .then(() => {})
    .catch(error => {
        console.log('WELCOME ERROR', error);
    });
};

/**
 * Gets the remote users.
 *
 * @param      {Function}  loadRemoteUsers  The load remote users
 */
export let getRemoteUsers = (loadRemoteUsers) => {
    const data = {
        toke: getToken(),
        admin: getAdminToken()
    };

    postRequest('/api/v1/remote/get_users', data)
    .then(result => {
        console.log('api', result);
        loadRemoteUsers(result.users);
    })
    .catch(error => {
        console.log('GET REMOTE USERS ERROR', error);
    });
};

/**
 * Sets the remote user.
 */
export let setRemoteUser = () => {
    const data = {
        token: getToken(),
        id: getUserId(),
        username: getUserName(),
        name: getUserFullName()
    };

    postRequest('/api/v1/remote/set_user', data)
    .then(() => {})
    .catch(error => {
        console.log('SET REMOTE USER ERROR', error);
    });
};

/**
 * Get the default documents.
 *
 * @param      {Function}  loadDefaultData  The load default data
 */
export let getDefaultDocuments = (loadDefaultData) => {
    const schemes = [new Model('room'), new Model('options')];
    const docs = ['1234', 'default'];
    let promises = [];

    for (let i = 0; i < schemes.length; i++) {
        promises.push(schemes[i].getDocument(docs[i]));
    }

    Promise.all(promises)
    .then(loadDefaultData)
    .catch(error => {
        console.log('DEFAULT ERROR', error);
    });
};
