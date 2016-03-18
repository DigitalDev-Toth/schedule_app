import 'rc-tree-select/assets/index.css';
import React from 'react';
import TreeSelect from 'rc-tree-select';
import { gData } from './TreeData';

const TreeField = React.createClass({
    getInitialState() {
        return {
            value: '0-0-0-0-value',
            multipleValue: []
        };
    },
    componentDidMount() {
    },
    onChange(value) {
        this.setState({ value });
    },
    onMultipleChange(value) {
        this.setState({ multipleValue: value });
    },
    render() {
        const { style, children, type,  ...props } = this.props;
        return (
            <div style={{margin: 20}}>
                <TreeSelect
                    id='examTree'
                    style={style}
                    treeIcon={true}
                    treeLine={true}
                    dropdownStyle={{maxHeight: 200, overflow: 'auto'}}
                    treeData={gData} treeLine
                    value={this.state.value}
                    treeDefaultExpandAll
                    placeholder={<i>Holi</i>}
                    maxTagTextLength={10}
                    searchPlaceholder='Examenes Qlos'
                    treeNodeFilterProp='title'
                    showCheckedStrategy={TreeSelect.SHOW_PARENT}
                    treeCheckable
                    onChange={this.onChange} />
            </div>
        );
    }
});
export default TreeField;
