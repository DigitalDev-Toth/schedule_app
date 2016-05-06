import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import {indigo500} from 'material-ui/lib/styles/colors';
import Styles from '../../styles/Style.jsx';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200
    },
    button: {
        backgroundColor: indigo500
    }
};

/**
 * CardPanel component
 *
 * @class      CardPanel (name)
 */
class CardPanel extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * React DOM rendering
     */
    render = () => {
        const { children, ...props } = this.props;

        return (
            <Styles color='indigo500'>
                <Card>
                    <CardHeader
                        {...props}
                        style = {styles.card}
                    />
                    <CardText>
                        {children}
                    </CardText>
                    <CardActions >
                        <RaisedButton
                            label='Guardar'
                            primary={true}
                        />
                    </CardActions>
                </Card>
             </Styles>
        );
    };
}

export default CardPanel;
