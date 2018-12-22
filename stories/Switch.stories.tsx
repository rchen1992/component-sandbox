import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Switch from '../src/Switch';
import { wInfo } from '../src/utils';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Switch', module) as any;

// const Container = styled.div`
//     padding-bottom: 10px;
// `;

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => (
        <>
            <Switch />
            <Switch defaultValue={true} />
        </>
    ),
    wInfo(`
        ### Notes

        Basic Switch. 
        
        Use **\`defaultValue\`** to set a default starting on/off state.
        
        Use **\`value\`** to force an on or off state.

        ### Usage
        ~~~js
        <Switch />
        <Switch defaultValue={true} />
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
            <Switch offColor="#F3451F" onColor="#2ECC71" />
            <Switch defaultValue={true} offColor="#F7DC6F" onColor="#BB8FCE" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`onColor\`** and **\`offColor\`** to set the colors for the on/off states.

        ### Usage
        ~~~js
        <Switch offColor="#F3451F" onColor="#2ECC71" />
        <Switch defaultValue={true} offColor="#F7DC6F" onColor="#BB8FCE" />
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
            <Switch offText="This is off" onText="This is on" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`offText\`** and **\`onText\`** to set text descriptions for the on/off states.

        ### Usage
        ~~~js
        <Switch offText='Pay by year' onText='Pay by month' />
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
            <Switch disabled />
            <Switch disabled defaultValue={true} />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled switch state.

        ### Usage
        ~~~js
        <Switch disabled />
        <Switch disabled defaultValue={true} />
        ~~~`)
);

/**
|--------------------------------------------------
| Events
|--------------------------------------------------
*/
// const Comp = () => {
//     const [value, setValue] = React.useState(true);
//     return (
//         <div>
//             <Switch value={value} onClick={() => setValue(!value)} />
//         </div>
//     );
// };

stories.add(
    'Events',
    () => (
        <>
            <Switch
                onClick={e => {
                    console.log('click Switch');
                    action('onClick')(e);
                }}
            />
        </>
    ),
    wInfo(`
        ### Notes

        You can use **\`onClick\`** event handlers.

        ### Usage
        ~~~js
        <Switch
            onClick={() => console.log('click Switch')}
        />
        ~~~`)
);

export default stories;
