import React from 'react';
import { FlatButton, Dialog, indigo500 } from 'material-ui';
import ProcedureForm from '../../form/ProcedureForm';
import Styles from '../../styles/Style';

export default class CalendarForm extends React.Component {
    constructor(props) {
        super(props);
        const { isOpen } = this.props;
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            isOpen
        };
    }
    componentDidMount() {
        this.setState({ open: this.props.isOpen });
    }
    /**
     * Request close handler
     */
    handleRequestClose() {
        if (this.props.onClose) {
            this.setState({
                open: false
            });
            this.props.onClose(this.state.isOpen);
        }
    }
    render() {
        const isOpen = this.props.isOpen;
        const standardActions = (
            <FlatButton
                label='Cancelar'
                secondary={true}
                onTouchTap={this.handleRequestClose}
                keyboardFocused={true} />
        );
        return (
            <div>
                <Styles color='indigo500'>
                    <Dialog
                        autoScrollBodyContent={true}
                        open={isOpen}
                        contentStyle = {styles.DialogTitle}
                        contentStyle = {styles.Dialog}
                        title='Ingreso de Procedimientos'
                        actions={standardActions}
                        modal={true}
                        onRequestClose={this.handleRequestClose}>
                        <ProcedureForm />
                    </Dialog>
                </Styles>
            </div>
        );
    }
}
const styles = {
    DialogTitle: {
        backgroundColor: indigo500,
        color: 'white'
    },
    Dialog: {
        width: '70%',
        maxWidth: 'none'
    }
};
CalendarForm.propTypes = {
    open: React.PropTypes.any
};
