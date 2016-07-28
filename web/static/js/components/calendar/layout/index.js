import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { cloneLayout, moveElement } from 'react-grid-layout/build/utils';
import { generateLayout, getLayoutWidth } from '../../../helpers/ToolsHelper';
import CalendarForm from '../form/';
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
        this.changeStateModal = this.changeStateModal.bind(this);
        this.state = {
            width: getLayoutWidth(),
            currentBreakpoint: 'lg',
            mounted: false,
            verticalCompact: false,
            layouts: {lg: this.props.initialLayout},
            openModal: false
        };
        this.layouts = undefined;
    }

    /**
     * React component did mount callback
     */
    componentDidMount() {
        this.setState({mounted: true});
    }
    /**
     * Request close handler
     */
    handleRequestClose() {
        this.setState({
            openModal: false
        });
    }
    /**
     * Touch tap handler
     */
    handleTouchTap() {
        this.setState({
            openModal: true
        });
    }
    /**
     * ChangeState From Modal Child
     *
     * @param      {Boolean}  Modal open state
     */
    changeStateModal(isOpen) {
        this.setState({
            openModal: isOpen
        });
    }
    /**
     * Generate DOM handler
     *
     * @return     {Object}  The items DOM
     */
    generateDOM() {
        return _.map(this.state.layouts.lg, (l, i) => {
            return (
                <div key={i}>
                    <Event handleTouchTap={this.handleTouchTap.bind(this)} />
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
     * On drag start handler
     *
     * @param      {Array}  layouts  The layouts
     */
    onDragStart(layouts) {
        this.layouts = cloneLayout(layouts);
    }

    /**
     * On drag handler
     *
     * @param      {Array}   layouts   The layouts
     * @param      {Object}  oldEvent  The old event
     * @param      {Object}  newEvent  The new event
     */
    onDrag(layouts, oldEvent, newEvent) {
        for (let i = 0; i < layouts.length; i++) {
            if (layouts[i].i === this.layouts[i].i) {
                if (layouts[i].y !== this.layouts[i].y && newEvent.x !== layouts[i].x) {
                    moveElement(layouts, layouts[i], this.layouts[i].x, this.layouts[i].y, true);
                }
            }
        }
    }

    /**
     * On drag stop handler
     *
     * @param      {Array}   layouts   The layouts
     * @param      {Object}  oldEvent  The old event
     * @param      {Object}  newEvent  The new event
     */
    onDragStop(layouts, oldEvent, newEvent) {
        for (let i = 0; i < layouts.length; i++) {
            if (layouts[i].i === this.layouts[i].i && newEvent.i !== layouts[i].i) {
                if (layouts[i].y !== this.layouts[i].y && newEvent.x === layouts[i].x) {
                    moveElement(layouts, layouts[i], this.layouts[i].x, this.layouts[i].y, true);
                }
            }
        }

        this.layouts = undefined;
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        const layouts = this.state.layouts;
        const mounted = this.state.mounted;
        const openModal = this.state.openModal;
        const verticalCompact = this.state.verticalCompact;
        return (
            <div>
                <div className='calendar-layout'>
                    <div className='cell-space'></div>
                    <div className='cell-layout'>
                        <ResponsiveReactGridLayout
                            {...this.props}
                            layouts={layouts}
                            onBreakpointChange={this.onBreakpointChange.bind(this)}
                            onLayoutChange={this.onLayoutChange.bind(this)}
                            onDragStart={this.onDragStart.bind(this)}
                            onDrag={this.onDrag.bind(this)}
                            onDragStop={this.onDragStop.bind(this)}
                            measureBeforeMount={false}
                            verticalCompact={verticalCompact}
                            useCSSTransforms={mounted}>
                                {this.generateDOM()}
                        </ResponsiveReactGridLayout>
                    </div>
                </div>
                <CalendarForm isOpen={openModal} onClose={this.changeStateModal} />
            </div>
        );
    }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * React properties types definitions
 */
Layout.propTypes = {
    config: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    onLayoutChange: PropTypes.func.isRequired
};

/**
 * React default properties
 */
Layout.defaultProps = {
    className: 'layout',
    rowHeight: 28,
    cols: {lg: 7, md: 7, sm: 7, xs: 7, xxs: 7},
    isResizable: false,
    margin: [4, 2],
    initialLayout: generateLayout()
};

export default Layout;
