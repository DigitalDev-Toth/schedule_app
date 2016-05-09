import React, { Component } from 'react';

/**
 * Grid component
 */
export class Grid extends Component {
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const { type, children } = this.props;
        let typeContainer = type ? type : 'container';

        return (
            <div className={typeContainer}>
                {children}
            </div>
        );
    }
}

/**
 * Row component
 */
export class Row extends Component {
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const { children } = this.props;

        return (
            <div className='row'>
                {children}
            </div>
        );
    }
}

/**
 * Col component
 */
export class Col extends Component {
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const { children, type } = this.props;
        const typeCol = type || 'col-md-12';

        return (
            <div className={typeCol}>
                {children}
            </div>
        );
    }
}
