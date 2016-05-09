import React, { Component } from 'react';
import { teal500 } from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: teal500
    }
});

/**
 * StyleTeal Component
 */
class StyleTeal extends Component {
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
        const { children, ...props } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    {children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default StyleTeal;
