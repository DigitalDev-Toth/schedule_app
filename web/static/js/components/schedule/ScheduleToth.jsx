import React, { Component } from 'react';
import Layout from './Layout';

/**
 * ScheduleToth component
 */
class ScheduleToth extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        this.state = {
            optionsDefault: this.props.optionsDefault,
            roomsDefault: this.props.roomsDefault
        };
    }
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <Layout optionsDefault={this.state.optionsDefault} roomsDefault={this.state.roomsDefault}/>
        );
    }
}

export default ScheduleToth;
