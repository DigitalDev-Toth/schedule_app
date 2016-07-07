import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions';
import API from '../api';
import { checkInstance } from '../helpers/Tools';
import { Grid, Row, Col } from '../components/box/Container';
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
/*import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';*/
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const __PRODUCTION__ = process.env.__PRODUCTION__;
const __DEVFULLSTACK__ = process.env.__DEVFULLSTACK__;

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
     * React component did mount callback
     */
    componentDidMount() {
        const actions = this.props.actions;

        if (__PRODUCTION__ || __DEVFULLSTACK__) {
            const pathname = this.props.location.pathname;
            const {instance, result} = checkInstance(pathname, this.props.instance);

            if (result) {
                actions.updateInstance(instance);
            }

            API.Remote.getRemoteUsers(actions.loadRemoteUsers);

            instance.on('remote_users', payload => {
                console.log('channel', payload);
                actions.loadRemoteUsers(payload.users);
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
        const users = this.props.users;

        if (users === undefined || users.length === 0) {
            return (
                <div className='loading text-center'>
                    <div className='cell'>
                        <CircularProgress size={2} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Grid>
                        <Row center='xs' center='md' around='xs' around='md'>
                            <Col type='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center' >
                                <h1>Lista de usuarios conectados</h1>
                                <Table selectable={false} >
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn style={{width: '120px'}}>Usuario</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '210px'}}>Nombre</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '150px'}}>IP</TableHeaderColumn>
                                            <TableHeaderColumn>Agente</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                                        {users.map((user) => {
                                            return (
                                                <TableRow>
                                                    <TableRowColumn style={{width: '120px'}}>{user.username}</TableRowColumn>
                                                    <TableRowColumn style={{width: '210px'}}>{user.name}</TableRowColumn>
                                                    <TableRowColumn style={{width: '150px'}}>{user.ip}</TableRowColumn>
                                                    <TableRowColumn>{user.agent}</TableRowColumn>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}

/**
 * React properties types definitions
 */
Looker.propTypes = {
    instance: PropTypes.any,
    users: PropTypes.any
};

/**
 * Material UI context types definitions
 */
Looker.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

/**
 * Map Redux states to React properties
 *
 * @param      {Object}  state   Redux state
 * @return     {Object}  Redux states
 */
const mapStateToProps = (state) => {
    return {
        instance: state.Channel.instance,
        users: state.Looker.users,
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
