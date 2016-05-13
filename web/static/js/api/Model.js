import DB from '../db/db';

export default class Model {
    constructor(schema) {
        this.schema = schema;
        this.getSchema(schema);
    }

    getSchema(schema) {
        return new Promise((resolve, reject) => {
            DB.getSchema(schema)
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
   /* static addDocument() {
        return new Promise((resolve, reject) => {
        });
    }

    static updateDocument() {
        return new Promise((resolve, reject) => {
        });
    }

    static deleteDocument() {
        return new Promise((resolve, reject) => {
        });
    }
    */
    getDocument(doc) {
        return new Promise((resolve, reject) => {
            if (!doc) {
                reject('Error: ');
            } else {
                DB.getDoc(this.schema + '/', doc)
                    .then((doc) => {
                        resolve(doc);
                    }).catch((err) => {
                        reject(err);
                    });
            }
        });
    }
    /*
    static getAllDocuments() {
        return new Promise((resolve, reject) => {
        });
    }
*/
}
