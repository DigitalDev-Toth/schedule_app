import React from 'react';
import {Grid, Row, Col} from '../box/Container';

export default class ScheduleGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row center='xs' center='md' around='xs' around='md'>
                    <Col type='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center' >
                        <h1>
                            Holi, qui debería haber un <b>puto</b> calendario de semana!
                        </h1>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
