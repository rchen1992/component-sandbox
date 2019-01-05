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

export default stories;
