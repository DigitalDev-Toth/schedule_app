/**
 * Get the documents.
 *
 * @param      {Array}  schemas  The schemas
 * @param      {Array}  docs     The docs
 * @param      {Object}  actions  The actions
 */
export let getDocuments = (schemas, docs, actions) => {
    let promises = [];

    for (let i = 0; i < schemas.length; i++) {
        promises.push(schemas[i].getDocument(docs[i]));
    }

    Promise.all(promises)
    .then(actions.getScheduleOptions)
    .catch(error => {
        console.log('ERROR!!', error);
    });
};
