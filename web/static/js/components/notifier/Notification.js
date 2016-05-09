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
     * React component will mount
     */
    componentWillMount() {
        this.setState({viewHeight: window.innerHeight});
    }

    /**
     * React component did mount
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
        let message = this.props.message;
        let show = this.props.show;
        let notificationSystem = this.notificationSystem;

        if (show && notificationSystem != null) {
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
    show: PropTypes.any,
    message: PropTypes.any
};

export default Notification;
