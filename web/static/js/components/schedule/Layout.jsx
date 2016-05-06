import React, { Component } from 'react';
import { Grid } from '../box/Container';
import Header from './Header';
import ScheduleGrid from './ScheduleGrid';

/**
 * Layout component
 *
 * @class      Layout (name)
 */
class Layout extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * React DOM rendering
     */
    render = () => {
        return (
            <Grid type='container-fluid'>
                <Header />
                <ScheduleGrid />
            </Grid>
        );
    };
}

export default Layout;
