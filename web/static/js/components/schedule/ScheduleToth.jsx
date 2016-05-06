import React, { Component } from 'react';
import Layout from './Layout';

/**
 * ScheduleToth component
 *
 * @class      ScheduleToth (name)
 */
class ScheduleToth extends Component {
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
            <Layout />
        );
    };
}

export default ScheduleToth;
