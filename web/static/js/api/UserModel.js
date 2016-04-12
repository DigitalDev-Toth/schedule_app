import DB from '../db/db';

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

    static updateUser() {}

    static deleteUser() {}
}
