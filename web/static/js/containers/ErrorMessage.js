import React, { Component } from 'react';
import { NotFound } from '../components/error/NotFound';

/**
 * Error container
 *
 * @class
 */
export class ErrorMessage extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     * @param      {Object}  context  Redux properties
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * React DOM rendering
     */
    render() {
        let error = undefined;
        let code = this.props.route.code;

        if (code === 404) {
            error = <NotFound code={code} />;
        }

        return (
            <section>{error}</section>
        );
    }
}
