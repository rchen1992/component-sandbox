import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';
import { action } from '@storybook/addon-actions';

const Events = (stories: any) => {
    stories.add(
        'Events',
        () => (
            <>
                <div style={{ marginBottom: '10px' }}>
                    <Switch
                        onClick={(e, data) => {
                            console.log('click Switch', data);
                            action('onClick')(e);
                        }}
                        style={formatStyles}
                    />
                    <span>&lt;-- logs to console on click</span>
                </div>
                <div>
                    <Switch
                        allowFocus
                        onFocus={(e, data) => {
                            console.log('focus Switch', data);
                            action('onFocus')(e);
                        }}
                        onBlur={(e, data) => {
                            console.log('blur Switch', data);
                            action('onBlur')(e);
                        }}
                        style={formatStyles}
                    />
                    <span>&lt;-- logs to console on focus/blur</span>
                </div>
            </>
        ),
        wInfo(`
        ### Notes

        You can set **\`onClick\`**, **\`onFocus\`**, and **\`onBlur\`** event handlers.

        In order to use focus/blur handlers, you need to set **\`allowFocus\`**.

        ### Usage
        ~~~js
        <Switch
            onClick={() => console.log('click Switch')}
        />
        <Switch
            allowFocus
            onFocus={() => console.log('focus Switch')}
            onBlur={() => console.log('blur Switch')}
        />
        ~~~`)
    );
};

export default Events;
