import React from 'react';
import {Grid} from '../box/Container';
import Header from './Header';
import ScheduleGrid from './ScheduleGrid';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid type='container-fluid'>
                <Header />
                <ScheduleGrid />
            </Grid>
        );
    }
}
