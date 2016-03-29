import React, { Component, PropTypes } from 'react';

/**
 * Error 404
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
                <h2>{this.props.code}</h2>
                <div>
                    <h3>
                        <i className='fa fa-warning' /> Oops! Pagina no encontrada.
                    </h3>
                    <p>
                        La pagina que ha solicitado no se encuentra disponible, esto puede ser debido
                        a que la ruta ha cambiado, o la dirección que ha escrito es incorrecta.
                    </p>
                </div>
            </div>
        );
    }
}
