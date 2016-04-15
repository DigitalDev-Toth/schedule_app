import React from 'react';
import ReactGridLayout from 'react-grid-layout';
/*import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout';*/

export default class SlotSchedule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //static: true
        var layout = [
            { i: 'a', x: 0, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'b', x: 2, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'c', x: 4, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'd', x: 6, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'e', x: 8, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'f', x: 10, y: 0, w: 2, h: 23, maxH: Infinity },
            { i: 'g', x: 12, y: 0, w: 2, h: 23, maxH: Infinity }
        ];
        console.log(layout);
        return (
            <ReactGridLayout className='layout' layout={layout} cols={14} rowHeight={30.5} width={1880}>
                <div className='slot' key={'a'}>a</div>
                <div className='slot' key={'b'}>b</div>
                <div className='slot' key={'c'}>c</div>
                <div className='slot' key={'d'}>d</div>
                <div className='slot' key={'e'}>e</div>
                <div className='slot' key={'f'}>f</div>
                <div className='slot' key={'g'}>g</div>
            </ReactGridLayout>
        );
    }
}
/*{
    "layouts": {
        "lg": [
                { "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 6, "y": 0, "i": "4", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 8, "y": 0, "i": "5", "moved": false, "static": false }],
        "md": [
                { "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 6, "y": 0, "i": "4", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 8, "y": 0, "i": "5", "moved": false, "static": false }],
        "sm": [
                { "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 4, "y": 3, "i": "4", "moved": false, "static": false },
                { "w": 2, "h": 3, "x": 4, "y": 6, "i": "5", "moved": false, "static": false }]
    }
}*/
