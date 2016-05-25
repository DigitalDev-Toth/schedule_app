import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
//import Schedule from '../../containers/Schedule.js';

/**
 * SlotSchedule component
 */

class SlotSchedule extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);
        this.state = {
            optionsDefault: this.props.optionsDefault,
            roomsDefault: this.props.roomsDefault
        };
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    componentDidMount() {

    }
    render() {
        let optionsDefault = this.state.optionsDefault;
        //let roomsDefault = this.state.roomsDefault;
        let columsLength = optionsDefault.options.days_of_week.length;
        return (
                <ResponsiveReactGridLayout className='layout' rowHeight={850}
                        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                        cols={{lg: columsLength, md: columsLength, sm: columsLength, xs: columsLength, xxs: columsLength}}>
                        {optionsDefault.options.days_of_week.map(this.renderTopCell, this)}
                </ResponsiveReactGridLayout>
        );
    }
    renderTopCell(options,data) {
        return (
            <div key={options} _grid={{x: data, y: 0, w: 1, h: 1, maxW: 2}} className='slot'>{options}</div>
        );
    }
}

export default SlotSchedule;
