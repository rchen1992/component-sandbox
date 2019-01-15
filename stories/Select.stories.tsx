import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Select from '../src/Select';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Select', module) as any;

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
    () => (
        <>
            <Select />
            <Select />
        </>
    ),
    wInfo(`
        ### Notes

        Basic Select. 
        
        ### Usage
        ~~~js
        <Select />
        ~~~`)
);

export default stories;
