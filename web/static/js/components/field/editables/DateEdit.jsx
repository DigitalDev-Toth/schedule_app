import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import moment from 'moment';

export default class  extends React.Component {
    constructor(props) {
        super(props);
        const { defaultDate, tagData } = this.props;
        this.state = {
            editing: false,
            defaultDate,
            tagData
        };
    }
    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }
        return this.renderDate();
    }
    renderEdit = () => {
        const dateMoment = moment(this.props.defaultDate, 'DD-MM-YYYY')._d;
        return <DatePicker
            ref = {
                (e) => e ? e.selectionStart = this.props.defaultDate.length : null
            }
            autoOk={ true }
            autoFocus={ true }
            value={ dateMoment }
            formatDate={this.formatDate}
            onChange={ this.finishEdit }
        />;
    };
    formatDate(date) {
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }
    renderDate = () => {
        return (
            <div onClick={ this.edit } >
                <span className='text'>{ this.props.defaultDate }</span>
            </div>
        );
    };
    edit = () => {
        this.setState({
            editing: true
        });
    };
    finishEdit = (e, date) => {
        e = e ? e : null;
        const newValue = moment(date).format('DD-MM-YYYY');
        if (this.state.defaultDate !== newValue && this.state.editing) {
            if (this.props.onEdit) {
                this.setState({
                    editing: false,
                    defaultDate: newValue
                });

                this.props.onEdit(this.state.tagData, newValue);
            }
        }
    };
}