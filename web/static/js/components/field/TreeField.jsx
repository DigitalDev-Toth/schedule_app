import 'rc-tree-select/assets/index.css';
import React, { Component } from 'react';
import TreeSelect from 'rc-tree-select';
import { gData } from './TreeData';

class TreeField extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);

        this.state = {
            value: '0-0-0-0-value',
            multipleValue: []
        };
    }

    /**
     * Change handler
     *
     * @param      {String|Integer|Boolean}  value   The value
     */
    onChange = (value) => {
        this.setState({value});
    };

    /**
     * Multi change handler
     *
     * @param      {String|Integer|Boolean}  value   The value
     */
    onMultipleChange = (value) => {
        this.setState({multipleValue: value});
    };

    /**
     * React DOM rendering
     */
    render = () => {
        const { style } = this.props;
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
    };
}

export default TreeField;
