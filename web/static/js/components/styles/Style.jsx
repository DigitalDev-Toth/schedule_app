import React, { Component } from 'react';
import { MuiThemeProvider, getMuiTheme, colors } from 'material-ui/styles';

/**
 * Styles component
 *
 * @class      Styles (name)
 */
class Styles extends Component {
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
        const { children, color } = this.props;
        const colorTheme = color ||'teal500';
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: colors[colorTheme]
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    {children}
                </div>
            </MuiThemeProvider>
        );
    };
}

export default Styles;
