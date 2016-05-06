import React, { Component } from 'react';

/**
 * Grid component
 *
 * @class      Grid (name)
 */
export class Grid extends Component {
    /**
     * React DOM rendering
     */
    render = () => {
        const { type, children } = this.props;
        let typeContainer = type ? type : 'container';

        return (
            <div className={typeContainer}>
                {children}
            </div>
        );
    };
}

/**
 * Row component
 *
 * @class      Row (name)
 */
export class Row extends Component {
    /**
     * React DOM rendering
     */
    render = () => {
        const { children } = this.props;

        return (
            <div className='row'>
                {children}
            </div>
        );
    };
}

/**
 * Col component
 *
 * @class      Col (name)
 */
export class Col extends Component {
    /**
     * React DOM rendering
     */
    render = () => {
        const { children, type } = this.props;
        const typeCol = type || 'col-md-12';

        return (
            <div className={typeCol}>
                {children}
            </div>
        );
    }
}
