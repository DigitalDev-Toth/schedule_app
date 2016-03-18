import React from 'react';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import {Row, Col} from '../box/Container.jsx';
import TreeField from '../field/TreeField.jsx';
import TableSimple from '../table/TablePatientEditable.jsx';
import { teal500 } from 'material-ui/lib/styles/colors';
console.log('teal500 ' , teal500);

export default class ProcedureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeValue: '0-0-0-0-value',
            multipleValue: [],
            controlledDate: new Date(),
            controlledTime: new Date()
        };
    }
    _handleChange = (event, date) => {
        this.setState({
            controlledDate: date
        });
    };
    render() {
        return (
            <Row>
                <Col type='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <TextField
                        style={{marginTop: '-6%'}}
                        hintText='Ej: 123123123-3'
                        floatingLabelText='Ingrese Rut'
                    />
                </Col>
                <Col type='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <DatePicker
                        hintText='Portrait Dialog'
                        value={this.state.controlledDate}
                        onChange={this._handleChange}
                        autoOk={true}
                        disabled={true}
                    />
                </Col>
                <Col type='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <TimePicker
                        format='24hr'
                        value={this.state.controlledTime}
                        autoOk={true}
                        disabled={true}
                    />
                </Col>
                <Col type='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <TreeField
                        style={{width: 250, color: teal500, marginLeft: '-6%', marginTop: '-36%'}}
                    />
                </Col>
                <Col type='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <TableSimple />
                </Col>
            </Row>
        );
    }
}
/*<br/>
                <TextField
                    defaultValue='Default Value'
                />
                <br/>
                <TextField
                    hintText='Hint Text'
                    floatingLabelText='Floating Label Text'
                />
                <br/>
                <TextField
                    hintText='Password Field'
                    floatingLabelText='Password'
                    type='password'
                />
                <br/>
                <TextField
                    hintText='MultiLine with rows: 2 and rowsMax: 4'
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                /><br/>
                <TextField
                    hintText='Message Field'
                    floatingLabelText='MultiLine and FloatingLabel'
                    multiLine={true}
                    rows={2}
                />*/
