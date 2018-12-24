import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Switch from '../src/Switch';
import { wInfo } from '../src/utils';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Switch', module) as any;

const formatStyles = {
    marginRight: '8px',
};

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => (
        <>
            <Switch style={formatStyles} />
            <Switch defaultChecked={true} />
        </>
    ),
    wInfo(`
        ### Notes

        Basic Switch. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.
        
        Use **\`checked\`** to force an on or off state.

        ### Usage
        ~~~js
        <Switch />
        <Switch defaultChecked={true} />
        ~~~`)
);

/**
|--------------------------------------------------
| Colors
|--------------------------------------------------
*/
stories.add(
    'Colors',
    () => (
        <>
            <Switch offColor="#F3451F" onColor="#2ECC71" style={formatStyles} />
            <Switch defaultChecked={true} offColor="#F7DC6F" onColor="#BB8FCE" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`onColor\`** and **\`offColor\`** to set the colors for the on/off states.

        ### Usage
        ~~~js
        <Switch offColor="#F3451F" onColor="#2ECC71" />
        <Switch defaultChecked={true} offColor="#F7DC6F" onColor="#BB8FCE" />
        ~~~`)
);

/**
|--------------------------------------------------
| Width
|--------------------------------------------------
*/
stories.add(
    'Width',
    () => (
        <>
            <Switch width={70} />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`width\`** set a custom width in px.

        ### Usage
        ~~~js
        <Switch width={70} />
        ~~~`)
);

/**
|--------------------------------------------------
| Text
|--------------------------------------------------
*/
stories.add(
    'Text',
    () => (
        <>
            <Switch offText="This is off" onText="This is on" textClassName="my-text" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`offText\`** and **\`onText\`** to set text descriptions for the on/off states.

        Use **\`textClassName\`** to set a className on the both text elements.

        ### Usage
        ~~~js
        <Switch
            offText="This is off"
            onText="This is on"
            textClassName="my-text"
        />
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled
|--------------------------------------------------
*/
stories.add(
    'Disabled',
    () => (
        <>
            <Switch disabled style={formatStyles} />
            <Switch disabled defaultChecked={true} />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled switch state.

        ### Usage
        ~~~js
        <Switch disabled />
        <Switch disabled defaultChecked={true} />
        ~~~`)
);

/**
|--------------------------------------------------
| Events
|--------------------------------------------------
*/
stories.add(
    'Events',
    () => (
        <>
            <div style={{ marginBottom: '10px' }}>
                <Switch
                    onClick={e => {
                        console.log('click Switch');
                        action('onClick')(e);
                    }}
                    style={formatStyles}
                />
                <span>&lt;-- logs to console on click</span>
            </div>
            <div>
                <Switch
                    allowFocus
                    onFocus={e => {
                        console.log('focus Switch');
                        action('onFocus')(e);
                    }}
                    onBlur={e => {
                        console.log('blur Switch');
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

export default stories;
