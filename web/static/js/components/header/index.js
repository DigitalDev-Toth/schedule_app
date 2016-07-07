import React, { Component, PropTypes } from 'react';

/**
 * Header component
 */
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
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const name = this.props.name;
        /*TODO: get types from options*/
        const config = this.props.options;
        const days = config.options.days_of_week;
        const cellWidth = 100 / days.length;

        return (
            <div className='header'>
                <div className='header-space'>&nbsp;</div>
                <div className='header-content text-left'>
                    <div className='typography'>
                        <div className='name'>
                            <span>{name}</span>
                        </div>
                        <div className='stains text-right'>
                            <div>
                                <i className='icon-stain red' />
                                <span>A</span>
                            </div>
                        </div>
                        <div className='stains text-right'>
                            <div>
                                <i className='icon-stain yellow' />
                                <span>B</span>
                            </div>
                        </div>
                        <div className='stains text-right'>
                            <div>
                                <i className='icon-stain blue' />
                                <span>C</span>
                            </div>
                        </div>
                        <div className='stains text-right'>
                            <div>
                                <i className='icon-stain orange' />
                                <span>D</span>
                            </div>
                        </div>
                    </div>
                    <div className='days'>
                        <table>
                            <tr>
                                {days.map((day) => {
                                    return (
                                        <th style={{width: `${cellWidth}%`}}>{day}</th>
                                    );
                                })}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Header.propTypes = {
    name: PropTypes.any,
    options: PropTypes.any
};

export default Header;
