import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import moment from 'moment';

export default class  extends React.Component {
    constructor(props) {
        super(props);
        const { defaultDate, tagData } = this.props;
        this.state = {
            defaultDate,
            tagData
        };
    }
    render() {
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
    }
    formatDate(date) {
        return moment(date).format('DD') + '-' + moment(date).format('MM') + '-' + moment(date).format('YYYY');
    }
    finishEdit = (e, date) => {
        e = e ? e : null;
        const newValue = moment(date).format('DD-MM-YYYY');
        if (this.state.defaultDate !== newValue) {
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