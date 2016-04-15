import React from 'react';
export class Grid extends React.Component {
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
export class Row extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className='row'>
                {children}
            </div>
        );
    }
}
export class Col extends React.Component {
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
