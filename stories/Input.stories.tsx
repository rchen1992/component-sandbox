import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Input from '../src/Input';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Input', module) as any;

// const formatStyles = {
//     marginRight: '8px',
// };

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => <Input placeholder="Please input" />,
    wInfo(`
        ### Notes

        Basic Input. 
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" />
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled
|--------------------------------------------------
*/
stories.add(
    'Disabled',
    () => <Input placeholder="Please input" disabled />,
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" disabled />
        ~~~`)
);

export default stories;
