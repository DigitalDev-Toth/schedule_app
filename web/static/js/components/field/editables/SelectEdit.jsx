import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class  extends React.Component {
    constructor(props) {
        super(props);
        const { previsions, selected, tagData } = this.props;
        this.state = {
            selected: selected.value,
            previsions,
            tagData
        };
    }
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
    handleChange = (event, index, changedValue) => {
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
    };
}