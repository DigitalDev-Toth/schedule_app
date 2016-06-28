import { authenticate, welcome, getDefaultDocuments } from './api.v1';

/**
 * Export API functions
 */
export default {
    Auth: {
        authenticate,
        welcome
    },
    Docs: {
        getDefaultDocuments
    }
};
