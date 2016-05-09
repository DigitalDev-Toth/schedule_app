import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

injectTapEventPlugin();

/**
 * App container
 */
class App extends Component {
    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
App.propTypes = {
    children: PropTypes.any
};

export default App;
