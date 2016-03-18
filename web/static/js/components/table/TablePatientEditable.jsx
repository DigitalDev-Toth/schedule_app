import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import EditInline from '../field/EditInline.jsx';

export default class TableSimple extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                                textValue='SIMPLICIO' />
                        </TableRowColumn>
                        <TableRowColumn>CARCAMO</TableRowColumn>
                        <TableRowColumn>SEGURA</TableRowColumn>
                        <TableRowColumn>siarcarse@gmail.com</TableRowColumn>
                        <TableRowColumn>+56973042355</TableRowColumn>
                        <TableRowColumn>10-12-1987</TableRowColumn>
                        <TableRowColumn>FONASA</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
    changeFieldPatient = (data) => {
        console.log(data);
    };

}

export default TableSimple;