import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

injectTapEventPlugin();

/**
 * App container
 *
 * @class      App (name)
 */
class App extends Component {
    /**
     * React properties types definitions
     */
    static propTypes = {
        children: PropTypes.any
    };

    /**
     * React DOM rendering
     */
    render = () => {
        return (
            <div>
                {this.props.children}
            </div>
        );
    };
}

export default App;
