import React, { Component } from 'react';

const codeStyle = {
    fontSize: '98pt'
};

/**
 * Error 404 component
 */
class NotFound extends Component {
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <div className='container'>
                <section>
                    <h1 style={codeStyle}>404</h1>
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
                </section>
            </div>
        );
    }
}

export default NotFound;
