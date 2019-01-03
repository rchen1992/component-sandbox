import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Radio from '../src/Radio';
import { wInfo } from '../src/utils';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Radio', module) as any;

const formatStyles = {
    marginRight: '12px',
};

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
const BasicRadios = () => {
    const [value, setValue] = React.useState('option1');

    function onChange(e: any, data: any) {
        setValue(data.value);
        action('onChange')(e);
    }

    return (
        <div>
            <Radio
                value="option1"
                checked={value === 'option1'}
                onChange={onChange}
                style={formatStyles}
            >
                Option 1
            </Radio>
            <Radio value="option2" checked={value === 'option2'} onChange={onChange}>
                Option 2
            </Radio>
        </div>
    );
};

stories.add(
    'Basic',
    () => (
        <>
            <BasicRadios />
        </>
    ),
    wInfo(`
        ### Notes

        Basic Radio Buttons. 
        
        Use **\`checked\`** to set selected state.

        Use **\`value\`** to set a value on the radio input.
        
        Attach **\`onChange\`** handler to receive updates on newly selected radio button.

        ### Usage
        ~~~js
        const BasicRadios = () => {
            const [value, setValue] = React.useState('option1');

            function onChange(e, data) {
                setValue(data.value);
            }

            return (
                <div>
                    <Radio value="option1" checked={value === 'option1'} onChange={onChange}>
                        Option 1
                    </Radio>
                    <Radio value="option2" checked={value === 'option2'} onChange={onChange}>
                        Option 2
                    </Radio>
                </div>
            );
        };
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled
|--------------------------------------------------
*/

stories.add(
    'Disabled',
    () => <Radio disabled>Option</Radio>,
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.

        ### Usage
        ~~~js
        <Radio disabled>Option</Radio>
        ~~~`)
);

/**
|--------------------------------------------------
| Radio Group
|--------------------------------------------------
*/
const RadioGroupExample = () => {
    const [value, setValue] = React.useState('option1');

    function onChange(e: any, data: any) {
        setValue(data.value);
        action('onChange')(e);
    }

    return (
        <Radio.Group value={value} onChange={onChange}>
            <Radio value="option1" style={formatStyles}>
                Option 1
            </Radio>
            <Radio value="option2" style={formatStyles}>
                Option 2
            </Radio>
            <Radio value="option3">Option 3</Radio>
        </Radio.Group>
    );
};

stories.add(
    'Radio Group',
    () => (
        <>
            <RadioGroupExample />
        </>
    ),
    wInfo(`
        ### Notes

        Use the Radio Group component for easier management of radio buttons.
        
        Provide a **\`value\`** prop to indicate the currently selected radio button.

        Attach an **\`onChange\`** handler to update that value.

        ### Usage
        ~~~js
        const RadioGroupExample = () => {
            const [value, setValue] = React.useState('option1');

            function onChange(e, data) {
                setValue(data.value);
            }

            return (
                <Radio.Group value={value} onChange={onChange}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </Radio.Group>
            );
        };
        ~~~`)
);

export default stories;
