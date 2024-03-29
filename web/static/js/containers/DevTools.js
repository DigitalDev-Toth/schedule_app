import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/**
 * Redux DevTools container
 */
const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        defaultPosition='left'
        defaultIsVisible={false}
        >
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);

export default DevTools;
