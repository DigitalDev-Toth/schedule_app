/**
 * Get the default documents.
 *
 * @param      {Array}     schemes             The schemes
 * @param      {Array}     docs                The docs
 * @param      {Function}  getScheduleOptions  The get schedule options
 */
export let getDefaultDocuments = (schemes, docs, getScheduleOptions) => {
    let promises = [];

    for (let i = 0; i < schemes.length; i++) {
        promises.push(schemes[i].getDocument(docs[i]));
    }

    Promise.all(promises)
    .then(getScheduleOptions)
    .catch(error => {
        console.log('ERROR!!', error);
    });
};
