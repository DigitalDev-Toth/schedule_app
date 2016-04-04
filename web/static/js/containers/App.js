import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';

injectTapEventPlugin();

/**
 * App container
 *
 * @class
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
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
