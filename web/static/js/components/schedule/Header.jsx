import React, { Component } from 'react';

class Header extends Component {
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
            <div className='text-center' >
                <div className='header'>
                    <h1>
                        Header y weas
                    </h1>
                </div>
            </div>
        );
    };
}

export default Header;
