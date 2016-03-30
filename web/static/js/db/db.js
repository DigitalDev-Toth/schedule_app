import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

const db = new PouchDB('http://toth.cl:5984/schedule');

/* db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
});*/

export default class DB {
    static getDefaultOptions() {
        db.get('options/default')
        .then((doc)=> {
            return doc;
        }).catch((err)=> {
            return err;
        });
    }
    /*static getRoom(_id) {

    }
    static getUsersFromRoom(_id) {

    }
    static getSchedules(_id) {

    }*/
 }
