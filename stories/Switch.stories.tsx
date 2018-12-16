import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Switch from '../src/Switch';
import { wInfo } from '../src/utils';
// import { action } from '@storybook/addon-actions';

// const actions = {
//     onClick: action('onClick'),
// };

const stories = storiesOf('Components/Switch', module) as any;

/**
|--------------------------------------------------
| Default
|--------------------------------------------------
*/
stories.add(
    'Default',
    () => (
        <>
            <Switch defaultValue={false} />
            <Switch defaultValue={true} />
        </>
    ),
    wInfo(`
        ### Notes

        Default Switch.

        ### Usage
        ~~~js
        <Switch />
        ~~~`)
);

export default stories;
