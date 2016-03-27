import { expect } from 'chai';

import { API } from '../../../web/static/js/api';

describe('The API', function() {
    it('should get the schedule', (done) => {
        let schedule = API.ScheduleModel.getSchedule();

        expect(schedule).to.be.an('object');

        done();
    });
});
