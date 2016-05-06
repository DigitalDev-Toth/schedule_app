import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';

/**
 * EditInline component
 *
 * @class      EditInline (name)
 */
class EditInline extends Component {
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
    dataChanged = (data) => {
        if (this.props.onEdit) {
            this.props.onEdit(data);
            this.setState({...data });
        }
    };

    /**
     * Validation handler
     *
     * @param      {String}  text    The text
     * @return     {Boolean}  Validation
     */
    customValidateText = (text) => {
        return (text.length > 0 && text.length < 64);
    };

    /**
     * React DOM rendering
     */
    render = () => {
        return (
            <div>
                <InlineEdit
                    validate={this.customValidateText}
                    activeClassName='editing form-control'
                    text={this.state.message}
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

export default EditInline;
