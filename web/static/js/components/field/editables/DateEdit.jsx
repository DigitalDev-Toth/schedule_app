import React, { Component } from 'react';
import { DatePicker } from 'material-ui';
import moment from 'moment';

/**
 * DateEdit component
 *
 * @class      DateEdit (name)
 */
class DateEdit extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        const { defaultDate, tagData } = this.props;
        this.state = {
            defaultDate,
            tagData
        };
    }

    /**
     * Get date formated
     *
     * @param      {String}  date    The date
     * @return     {String}  Date formated
     */
    formatDate = (date) => {
        return `${moment(date).format('DD')} - ${moment(date).format('MM')} - ${moment(date).format('YYYY')}`;
    };

    /**
     * Finish edition callback
     *
     * @param      {Object}  event   The event
     * @param      {String}  date    The date
     */
    finishEdit = (event, date) => {
        event = event ? event : null;

        const newValue = moment(date).format('DD-MM-YYYY');

        if (this.state.defaultDate !== newValue) {
            if (this.props.onEdit) {
                this.setState({
                    editing: false,
                    defaultDate: newValue
                });

                this.props.onEdit(this.state.tagData, newValue);
            }
        }
    };

    /**
     * React DOM rendering
     */
    render = () => {
        const dateMoment = moment(this.props.defaultDate, 'DD-MM-YYYY')._d;

        return <DatePicker
            ref = {
                (e) => e ? e.selectionStart = this.props.defaultDate.length : null
            }
            autoOk={ true }
            autoFocus={ true }
            value={ dateMoment }
            formatDate={this.formatDate}
            onChange={ this.finishEdit }
        />;
    };
}

export default DateEdit;
