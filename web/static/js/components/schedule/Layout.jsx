import React, { Component } from 'react';
import { Grid } from '../box/Container';
import Header from './Header';
import ScheduleGrid from './ScheduleGrid';
/*import { API } from '../../api';

const room = new API.Model('room');
const options = new API.Model('options');*/

/**
 * Layout component
 */
class Layout extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        this.state = {};
    }
    /*componentDidMount() {
        this.getState().then((value) => {
            this.changeState(value);
        });
    }*/
    /*getState() {
        return new Promise((resolve, reject) => {
            let promises = [
                options.getDocument('default'),
                room.getDocument('1234')
            ];
            Promise.all(promises)
                .then(responses => {
                    let json = {
                        defaultOptions: responses[0].options,
                        roomOptions: responses[1]
                    };
                    resolve(json);
                })
                .catch(err => {
                    reject('error', err);
                });
        });
    }*/
    /*changeState(state) {
        this.setState({ state });
    }*/
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <Grid type='container-fluid'>
                <Header />
                <ScheduleGrid />
            </Grid>
        );
    }
}

export default Layout;
