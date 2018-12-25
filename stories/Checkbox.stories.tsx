import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Checkbox from '../src/Checkbox';
import { wInfo } from '../src/utils';
// import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Checkbox', module) as any;

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
            <Checkbox />
        </>
    ),
    wInfo(`
        ### Notes

        Basic Checkbox. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.
        
        Use **\`checked\`** to force an on or off state.

        ### Usage
        ~~~js
        <Switch />
        <Switch defaultChecked={true} />
        ~~~`)
);

export default stories;
