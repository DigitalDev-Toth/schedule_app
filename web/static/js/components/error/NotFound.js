import React, { Component, PropTypes } from 'react';

const codeStyle = {
    fontSize: '98pt'
};

/**
 * Error 404 component
 *
 * @class
 */
export class NotFound extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        code: PropTypes.number.isRequired
    };

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
        return (
            <div>
                <h1 style={codeStyle}>{this.props.code}</h1>
                <div>
                    <h2>
                        <i className='fa fa-warning' /> Oops! Página no encontrada.
                    </h2>
                    <br />
                    <p>
                        La página que ha solicitado no se encuentra disponible, esto puede ser debido
                        a que la ruta ha cambiado, o la dirección que ha escrito es incorrecta.
                    </p>
                </div>
            </div>
        );
    }
}
