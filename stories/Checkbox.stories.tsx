import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Checkbox from '../src/Checkbox';
import { wInfo } from '../src/utils';
// import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Checkbox', module) as any;

const formatStyles = {
    marginRight: '12px',
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
            <Checkbox defaultChecked value="option1">
                Option 1
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Basic Checkbox. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.

        Use **\`value\`** to set a value on the checkbox input.

        ### Usage
        ~~~js
        <Checkbox defaultChecked value="option1">Option 1</Checkbox>
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
            <Checkbox disabled style={formatStyles}>
                Option 1
            </Checkbox>
            <Checkbox disabled defaultChecked>
                Option 2
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.

        ### Usage
        ~~~js
        <Checkbox disabled>Option 1</Checkbox>
        <Checkbox disabled defaultChecked>Option 2</Checkbox>
        ~~~`)
);

/**
|--------------------------------------------------
| Indeterminate
|--------------------------------------------------
*/
stories.add(
    'Indeterminate',
    () => (
        <>
            <Checkbox indeterminate style={formatStyles}>
                Option 1
            </Checkbox>
            <Checkbox indeterminate disabled>
                Option 2
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`indeterminate\`** to set an indeterminate state.

        ### Usage
        ~~~js
        <Checkbox indeterminate>Option 1</Checkbox>
        <Checkbox indeterminate disabled >Option 2</Checkbox>
        ~~~`)
);

export default stories;
