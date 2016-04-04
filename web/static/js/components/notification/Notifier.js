import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';

/**
 * Notifier component
 *
 * @class
 */
class Notifier extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        open: PropTypes.any,
        message: PropTypes.any
    };

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
        let message = this.props.message === undefined ? '' : this.props.message;

        return (
            <div>
                <Snackbar
                    open={this.props.open}
                    message={message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    };
}

export default Notifier;
