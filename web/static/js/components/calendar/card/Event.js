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

        return (
            <div onDoubleClick={handleTouchTap} className='event'>
                <div className='info'>
                    <div className='name'>John Doe</div>
                    <div className='dni'></div>
                </div>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Event.propTypes = {
    handleTouchTap: PropTypes.func.isRequired
};

export default Event;
