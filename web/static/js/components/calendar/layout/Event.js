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
        const handleTouchTap = this.props.handleTouchTap;
        const id = this.props.id;

        return (
            <div onDoubleClick={handleTouchTap} className='event'>
                <div className='info'>
                    <div className='name'>John Doe</div>
                    <div className='dni'>15.523.321-8</div>
                    <h1>{id}</h1>
                </div>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Event.propTypes = {
    handleTouchTap: PropTypes.any,
    id: PropTypes.any
};

export default Event;
