import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

const db = new PouchDB('http://toth.cl:5984/schedule');
export default class DB {

    /**
     * { function_description }
     *
     * @method     getDefaultOptions
     * @return     {Promise}  { description_of_the_return_value }
     */
    static getDefaultOptions() {
        return new Promise((resolve, reject) => {
            db.get('options/default')
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * { function_description }
     *
     * @method     getRoom
     * @param      {<type>}   id      { description }
     * @return     {Promise}  { description_of_the_return_value }
     */
    static getRoom(id) {
        return new Promise((resolve, reject) => {
            db.get(`room/${id}`)
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    
    /**
     * Promise.all
     *
     * @method     getConfigSchedule
     * @param         _id
     * @return     {Promise}  return Object with config
     */
    static getConfigSchedule(_id) {
        return new Promise((resolve, reject) => {
            let promises = [this.getDefaultOptions(), this.getRoom(_id)];
            Promise.all(promises)
                .then(responses => { 
                    let json = {
                        defaultOptions: responses[0].options,
                        roomOptions: responses[1]
                    };
                    resolve(json);
                })
                .catch(err => { 
                    reject(err);
                });
        });
    }
}
