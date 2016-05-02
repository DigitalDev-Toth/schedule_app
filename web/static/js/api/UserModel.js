import DB from '../db/db';

//console.log(DB.getSchema('user'));

export default class UserModel {

    static fetchAllUsers() {
        return new Promise((resolve, reject) => {
            DB.getAll('user/')
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static getUser(user) {
        return new Promise((resolve, reject) => {
            user = user ? user : 'username1';
            DB.getDoc('user/', user)
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static newUser() {}
    static getSchema(doc) {
        return new Promise((resolve, reject) => {
            doc = doc ? doc : 'user';
            DB.getSchema('user')
                .then((doc) => {
                    resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    static updateUser() {}

    static deleteUser() {}
}
