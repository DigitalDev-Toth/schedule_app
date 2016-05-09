import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';

/**
 * SelectEdit component
 */
class SelectEdit extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        const { previsions, selected, tagData } = this.props;
        this.state = {
            selected: selected.value,
            previsions,
            tagData
        };
    }

    /**
     * Change handler
     *
     * @param      {Object}  event         The event
     * @param      {Integer}  index         The index
     */
    handleChange(event, index, changedValue) {
        event = event ? event : null;
        index = index ? index : null;
        if (this.state.selected !== changedValue) {
            if (this.props.onEdit) {
                this.setState({
                    selected: changedValue
                });
                this.props.onEdit(this.state.tagData, changedValue);
            }
        }
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const previsions = this.state.previsions;
        return (
            <SelectField value={this.state.selected} onChange={this.handleChange}>
                {previsions.map(prevision =>
                    <MenuItem
                        value={prevision.value}
                        key={prevision.value}
                        primaryText={prevision.text}
                    />
                )}
            </SelectField>
        );
    }
}

export default SelectEdit;
