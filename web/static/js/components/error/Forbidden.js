import React, { Component } from 'react';

const codeStyle = {
    fontSize: '98pt'
};

/**
 * Error 403 component
 *
 * @class
 */
class Forbidden extends Component {
    /**
     * React DOM rendering
     */
    render() {
        return (
            <div className='container'>
                <section>
                    <h1 style={codeStyle}>403</h1>
                    <div>
                        <h2>
                            <i className='fa fa-warning' /> Oops! Acceso no permitido.
                        </h2>
                        <br />
                        <p>
                            Tal parece que intentas acceder a esta página sin autorización. Intenta
                            ingresar desde un sitio con permisos.
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Forbidden;
