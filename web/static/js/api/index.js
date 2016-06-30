import {
    authenticate,
    welcome,
    getRemoteUsers,
    setRemoteUser,
    getDefaultDocuments
} from './api.v1';

/**
 * Export API functions
 */
export default {
    Auth: {
        authenticate,
        welcome
    },
    Remote: {
        getRemoteUsers,
        setRemoteUser
    },
    Docs: {
        getDefaultDocuments
    }
};
