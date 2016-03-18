import React from 'react';
import InlineEdit from 'react-edit-inline';
/*import { blueGrey100 } from 'material-ui/lib/styles/colors';*/

export default class EditInline extends React.Component {

    constructor(props) {
        super(props);
        const {textValue} = this.props;
        this.dataChanged = this.dataChanged.bind(this);
        this.state = {
            message: textValue
        };
    }

    dataChanged(data) {
        console.log('data ' , data);
        console.log('state ' , this.state.message);
        this.setState({...data });
    }

    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    render() {
        return (<div>
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
        </div>);
    }
}
