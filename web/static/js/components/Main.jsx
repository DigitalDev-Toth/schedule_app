import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton, indigo500 } from 'material-ui';
import { Grid, Row, Col } from './box/Container';
import ProcedureForm from './form/ProcedureForm';
import Styles from './styles/Style';

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

/**
 * Main component
 *
 * @class      Main (name)
 */
class Main extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     * @param      {Object}  context  Redux properties
     */
    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false
        };
    }

    /**
     * Request close handler
     */
    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    /**
     * Touch tap handler
     */
    handleTouchTap = () => {
        this.setState({
            open: true
        });
    };

    /**
     * React DOM rendering
     */
    render = () => {
        const standardActions = (
            <FlatButton
                label='Cancelar'
                secondary={true}
                onTouchTap={this.handleRequestClose}
                keyboardFocused={true}
            />
        );

        return (
            <Grid>
                <Row center='xs' center='md' around='xs' around='md'>
                    <Col type='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center' >
                        <Styles color='indigo500'>
                            <Dialog
                                autoScrollBodyContent={true}
                                open={this.state.open}
                                contentStyle = {styles.DialogTitle}
                                contentStyle = {styles.Dialog}
                                title='Ingreso de Procedimientos'
                                actions={standardActions}
                                modal={true}
                                onRequestClose={this.handleRequestClose}
                            >
                                <ProcedureForm />
                            </Dialog>
                            <h1>material-ui</h1>
                            <h2>example project</h2>
                            <RaisedButton
                            label='Tocame Porfita'
                            primary={true}
                            onTouchTap={this.handleTouchTap}
                            />
                        </Styles>
                    </Col>
                </Row>
            </Grid>
        );
    };
}

export default Main;
