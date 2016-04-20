import React, { Component, PropTypes } from 'react';
import { Snackbar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import the colors wanted to customize your theme here, if you want to
import { orange500 } from 'material-ui/styles/colors'

// customize your theme here
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: orange500
    }
})
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
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Snackbar
                        open={this.props.open}
                        message={message}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </MuiThemeProvider>
            </div>
        );
    };
}

export default Notifier;
