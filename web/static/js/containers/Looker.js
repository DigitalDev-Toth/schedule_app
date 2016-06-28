import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import { Grid, Row, Col } from '../components/box/Container';
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const __DEPLOYMENT__ = process.env.__DEPLOYMENT__;
const __PRODUCTION__ = process.env.__PRODUCTION__;

/**
 * Looker container
 */
class Looker extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     * @param      {Object}  context  Redux properties
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * React component did mount
     */
    componentDidMount() {
        if (__DEPLOYMENT__ || __PRODUCTION__) {
            this.props.channel.on('schedule:onlooker', params => {
                this.props.actions.showScheduleOnlookerUserRemote(params.usersRemote);
            });
        }
    }

    /**
     * Get the child context.
     *
     * @return     {Object}  Child context.
     */
    getChildContext() {
        return {muiTheme: getMuiTheme()};
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        let usersRemote = this.props.usersRemote === undefined ? [] : this.props.usersRemote;

        let users = usersRemote.map((userRemote) => {
            return (
                <TableRow>
                    <TableRowColumn style={{width: '150px'}}>username</TableRowColumn>
                    <TableRowColumn style={{width: '150px'}}>{userRemote.ip}</TableRowColumn>
                    <TableRowColumn style={{width: '100px'}}>{userRemote.method}</TableRowColumn>
                    <TableRowColumn>{userRemote.agent}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <div>
                <Grid>
                    <Row center='xs' center='md' around='xs' around='md'>
                        <Col type='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center' >
                            <h1>Lista de usuarios conectados</h1>
                            <Table selectable={false} >
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn style={{width: '150px'}}>Usuario</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '150px'}}>IP</TableHeaderColumn>
                                        <TableHeaderColumn style={{width: '100px'}}>Método</TableHeaderColumn>
                                        <TableHeaderColumn>Agente</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                                    {users}
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Looker.propTypes = {
    channel: PropTypes.any,
    usersRemote: PropTypes.any
};

/**
 * Material-UI context types
 */
Looker.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

/**
 * Map Redux states to React properties
 *
 * @param      {Object}  state   Redux state
 * @return     {Object}  Redux states
 */
const mapStateToProps = (state) => {
    return {
        channel: state.ScheduleOptions.channel,
        usersRemote: state.ScheduleChannel.usersRemote,
        state
    };
};

/**
 * Map Redux actions to React properties
 *
 * @param      {Function}  dispatch  Redux action
 * @return     {Object}  Redux actions
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(scheduleActions, dispatch)
    };
};

/**
 * Connect React component with Redux store
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Looker);
