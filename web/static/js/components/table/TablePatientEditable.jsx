import React from 'react';
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui';
import EditInline from '../field/EditInline';
import DateEdit from '../field/editables/DateEdit';
import SelectEdit from '../field/editables/SelectEdit';

/**
 * TableSimple component
 *
 * @class      TableSimple (name)
 */
class TableSimple extends React.Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);

        /* Pouch DB State*/
        this.state = {
            changed: false,
            patientData: {
                firstname: 'SIMPLICIO',
                lastname: 'CARCAMO',
                lastname1: 'SEGURA',
                mail: 'siarcarse@gmail.com',
                phone: '+56973042355',
                birthdate: '10-12-1987',
                prevision: {value: 1}
            },
            previsionData: {
                previsions: [{value: 1, text: 'FONASA'}, {value: 2, text: 'ISAPRE'}, {value: 3, text: 'INSTITUTION'}],
                isapres: [{value: 1, text: 'BANMEDICA'}, {value: 2, text: 'CONSALUD'}, {value: 3, text: 'MAS VIDA'}],
                institutions: [{value: 1, text: 'SOPROLE'}, {value: 2, text: 'MUNI CCO'}, {value: 3, text: 'TOTH'}]
            }
        };
    }

    /**
     * Change handler
     *
     * @param      {Object}  tagData  The tag data
     * @param      {Object}  data     The data
     */
    changeFieldPatient = (tagData, data) => {
        if (this.state.patientData[tagData]) {
            const patientData = this.state.patientData;
            patientData[tagData] = data;
            this.setState({
                changed: true,
                patientData
            });
        }
    };

    /**
     * React DOM rendering
     */
    render = () => {
        return (
            <Table selectable={false} >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Nombre</TableHeaderColumn>
                        <TableHeaderColumn>Apellido P.</TableHeaderColumn>
                        <TableHeaderColumn>Apellido M.</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Celular</TableHeaderColumn>
                        <TableHeaderColumn>Nacimiento</TableHeaderColumn>
                        <TableHeaderColumn>Prevision</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>
                            <EditInline
                                textInline={this.state.patientData.firstname}
                                tagData='firstname'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <EditInline
                                textInline={this.state.patientData.lastname}
                                tagData='lastname'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <EditInline
                                textInline={this.state.patientData.lastname1}
                                tagData='lastname1'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <EditInline
                                textInline={this.state.patientData.mail}
                                tagData='mail'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <EditInline
                                textInline={this.state.patientData.phone}
                                tagData='phone'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <DateEdit
                                defaultDate={this.state.patientData.birthdate}
                                tagData='birthdate'
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                        <TableRowColumn>
                            <SelectEdit
                                tagData='prevision'
                                previsions={this.state.previsionData.previsions}
                                selected={this.state.patientData.prevision}
                                onEdit={this.changeFieldPatient} />
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    };
}

export default TableSimple;
