import React, { Component } from 'react';
import { TextField, DatePicker, TimePicker, teal500 } from 'material-ui';
import { Row, Col } from '../box/Container.jsx';
import TreeField from '../field/TreeField.jsx';
import TableSimple from '../table/TablePatientEditable.jsx';

/**
 * ProcedureForm component
 */
class ProcedureForm extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        this.state = {
            treeValue: '0-0-0-0-value',
            multipleValue: [],
            controlledDate: new Date(),
            controlledTime: new Date()
        };
    }

    /**
     * Change event handler
     *
     * @param      {Object}  event   The event
     * @param      {String}  date    The date
     */
    _handleChange(event, date) {
        this.setState({
            controlledDate: date
        });
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
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

export default ProcedureForm;
