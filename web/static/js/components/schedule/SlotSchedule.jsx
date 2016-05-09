import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';

const ReactGrid = WidthProvider(ReactGridLayout);

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
    }

    /**
     * React DOM rendering
     *
     * @return     {Object}  React DOM object
     */
    render() {
        let layout = [
            { i: 'a', x: 0, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'b', x: 2, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'c', x: 4, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'd', x: 6, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'e', x: 8, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'f', x: 10, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'g', x: 12, y: 0, w: 2, h: 23, maxH: Infinity }
        ];

        return (
            <ReactGrid className='layout' layout={layout} cols={14} rowHeight={30.5} width={1880}>
                <div className='slot' key={'a'}>a</div>
                <div className='slot' key={'b'}>b</div>
                <div className='slot' key={'c'}>c</div>
                <div className='slot' key={'d'}>d</div>
                <div className='slot' key={'e'}>e</div>
                <div className='slot' key={'f'}>f</div>
                <div className='slot' key={'g'}>g</div>
            </ReactGrid>
        );
    }
}

export default SlotSchedule;
