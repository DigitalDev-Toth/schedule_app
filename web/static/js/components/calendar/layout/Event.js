import React, { Component, PropTypes } from 'react';

/**
 * Event component
 */
class Event extends Component {
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
        console.log(this);
        /*const handleTouchTap = this.props.handleTouchTap;*/

        return (
            <div className='event'>
                <div className='info'>
                    <div className='name'>John Doe</div>
                    <div className='dni'>15.523.321-8</div>
                </div>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
/*Event.propTypes = {
    a: PropTypes.any
};*/

export default Event;
