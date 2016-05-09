import React, { Component } from 'react';
import DateEdit from './editables/DateEdit';

/**
 * DateEditable component
 */
class DateEditable extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        const {textInline} = this.props;
        this.dataChanged = this.dataChanged.bind(this);
        this.state = {
            message: textInline
        };
    }

    /**
     * Change handler
     *
     * @param      {Object}  data    The data
     */
    dataChanged(data) {
        if (this.props.onEdit) {
            this.props.onEdit(data);
            this.setState({...data });
        }
    }

    /**
     * Validation handler
     *
     * @param      {String}  text    The text
     * @return     {Boolean}  Validation
     */
    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        return (
            <div>
                <DateEdit
                    validate={this.customValidateText}
                    text={this.state.message}
                    editingElement='date'
                    paramName='message'
                    change={this.dataChanged}
                    style={{
                        minWidth: 150,
                        display: 'inline-block'
                    }}
                />
            </div>
        );
    }
}

export default DateEditable;
