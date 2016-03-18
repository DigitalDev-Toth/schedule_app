import React from 'react';
export class Grid extends React.Component {
    render() {
        const { children, ...props } = this.props;
        return (
            <div className='container'>
                {children}
            </div>
        );
    }
}
export class Row extends React.Component {
    render() {
        const { children, ...props } = this.props;
        return (
            <div className='row'>
                {children}
            </div>
        );
    }
}
export class Col extends React.Component {
    render() {
        const { children, type,  ...props } = this.props;
        const typeCol = type || 'col-md-12';
        return (
            <div className={typeCol}>
                {children}
            </div>
        );
    }
}
