import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {
    /*getDayPeriodInSeconds,
    getFrequencyInSeconds,
    getCellWidth,*/
    generateLayout
} from '../../../helpers/ToolsHelper';
import Event from './Event';

/**
 * Layout component
 */
class Layout extends Component {
    /**
     * Basic React component constructor
     *
     * @param      {Object}  props    React properties
     */
    constructor(props) {
        super(props);

        this.state = {
            currentBreakpoint: 'lg',
            mounted: false,
            layouts: {lg: this.props.initialLayout}
        };
    }

    /**
     * React component did mount callback
     */
    componentDidMount() {
        this.setState({mounted: true});
    }

    /**
     * Generate DOM handler
     *
     * @return     {Object}  The items DOM
     */
    generateDOM() {
        return _.map(this.state.layouts.lg, function(l, i) {
            return (
                <div key={i}>
                    <Event />
                </div>
            );
        });
    }

    /**
     * On breakpoint change handler
     *
     * @param      {String}  breakpoint  The breakpoint
     */
    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint
        });
    }

    /**
     * On Layout change handler
     *
     * @param      {Object}  layout   The layout
     * @param      {Array}  layouts  The layouts
     */
    onLayoutChange(layout, layouts) {
        this.props.onLayoutChange(layout, layouts);
    }

    /**
     * On new layout
     */
    onNewLayout() {
        this.setState({
            layouts: {lg: generateLayout()}
        });
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        /*const config = this.props.config;
        const rooms = this.props.rooms;
        const days = config.options.days_of_week;
        const frequency = getFrequencyInSeconds(rooms.frequency);
        const period = getDayPeriodInSeconds(rooms.init_time, rooms.end_time);
        const cellWidth = getCellWidth(days.length);*/

        return (
            <div className='calendar-layout'>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange.bind(this)}
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    measureBeforeMount={false}
                    useCSSTransforms={this.state.mounted}>
                        {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * React properties types definitions
 */
Layout.propTypes = {
    config: PropTypes.any,
    rooms: PropTypes.any,
    onLayoutChange: PropTypes.func.isRequired
};

/**
 * React default properties
 */
Layout.defaultProps = {
    width: window.innerWidth,
    className: 'layout',
    rowHeight: 78,
    cols: {lg: 7, md: 10, sm: 6, xs: 4, xxs: 2},
    isResizable: false,
    margin: [4, 2],
    verticalCompact: false,
    initialLayout: generateLayout()
};

export default Layout;
