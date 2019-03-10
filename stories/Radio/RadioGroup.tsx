import * as React from 'react';
import Radio from '../../src/Radio';
import { wInfo } from '../../src/utils';
import { action } from '@storybook/addon-actions';
import { formatStyles } from './util';

const RadioGroup = (stories: any) => {
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
};

export default RadioGroup;
