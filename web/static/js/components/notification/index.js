import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

/**
 * Notification component
 */
class Notification extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);

        this.state = {
            allowHTML: false,
            viewHeight: null
        };

        this.notificationSystem = null;
    }

    /**
     * React component will mount callback
     */
    componentWillMount() {
        this.setState({viewHeight: window.innerHeight});
    }

    /**
     * React component did mount callback
     */
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    /**
     * Show new notification
     *
     * @param      {String}  message  The message to show
     */
    addNotification(message) {
        this.notificationSystem.addNotification({
            message,
            level: 'success'
        });
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const message = this.props.message;
        const show = this.props.show;
        const notificationSystem = this.notificationSystem;

        if (show && notificationSystem) {
            this.addNotification(message);
        }

        return (
            <div>
                <NotificationSystem ref='notificationSystem' />
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Notification.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
};

export default Notification;
