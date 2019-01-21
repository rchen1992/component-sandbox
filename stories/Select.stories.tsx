import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Select from '../src/Select';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Select', module) as any;

// const formatStyles = {
//     marginRight: '8px',
// };

// Mock options
const mockOptions = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
];

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => (
        <Select>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
    ),
    wInfo(`
        ### Notes

        Basic Select. 
        
        ### Usage
        ~~~js
        const mockOptions = [
            { value: 'Option1', label: 'Option1', },
            { value: 'Option2', label: 'Option2', },
            { value: 'Option3', label: 'Option3', },
            { value: 'Option4', label: 'Option4', },
            { value: 'Option5', label: 'Option5', },
        ];
        
        <Select>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled Option
|--------------------------------------------------
*/
const mockOptionsWithDisabled = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
        disabled: true,
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
        disabled: true,
    },
];

stories.add(
    'Disabled Option',
    () => (
        <Select>
            {mockOptionsWithDisabled.map(option => (
                <Select.Option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    disabled={option.disabled}
                />
            ))}
        </Select>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** on **\`Select.Option\`** to disabled that option in the list.
        
        ### Usage
        ~~~js
        const mockOptions = [
            { value: 'Option1', label: 'Option1', },
            { value: 'Option2', label: 'Option2', disabled: true },
            { value: 'Option3', label: 'Option3', },
            { value: 'Option4', label: 'Option4', },
            { value: 'Option5', label: 'Option5', disabled: true },
        ];
        
        <Select>
            {mockOptionsWithDisabled.map(option => (
                <Select.Option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    disabled={option.disabled}
                />
            ))}
        </Select>
        ~~~`)
);

export default stories;
