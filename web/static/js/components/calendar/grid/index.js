import React, { Component, PropTypes } from 'react';

/**
 * Grid component
 */
class Grid extends Component {
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
        const config = this.props.config;
        const days = config.options.days_of_week;
        const cellWidth = 100 / days.length;

        return (
            <div className='calendar-grid'>
                <table>
                    {(() => {
                        let rows = [];

                        for (let i = 0; i < 300; i++) {
                            rows.push(
                                <tr>
                                    {days.map(() => {
                                        return (
                                            <td style={{width: `${cellWidth}%`}}></td>
                                        );
                                    })}
                                </tr>
                            );
                        }

                        return rows;
                    })()}
                </table>
            </div>
        );
    }
}

/**
 * React properties types definitions
 */
Grid.propTypes = {
    config: PropTypes.any
};

export default Grid;
