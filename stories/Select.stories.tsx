import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Select from '../src/Select';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Select', module) as any;

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

/**
|--------------------------------------------------
| Disabled Select
|--------------------------------------------------
*/
stories.add(
    'Disabled Select',
    () => (
        <Select disabled>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** on **\`Select\`** to disable entire component.
        
        ### Usage
        ~~~js
        const mockOptions = [
            { value: 'Option1', label: 'Option1', },
            { value: 'Option2', label: 'Option2', },
            { value: 'Option3', label: 'Option3', },
            { value: 'Option4', label: 'Option4', },
            { value: 'Option5', label: 'Option5', },
        ];
        
        <Select disabled>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
        ~~~`)
);

/**
|--------------------------------------------------
| Clearable
|--------------------------------------------------
*/
stories.add(
    'Clearable',
    () => (
        <Select clearable>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
    ),
    wInfo(`
        ### Notes

        Use **\`clearable\`** allow clearing the select with a clear icon.
        
        ### Usage
        ~~~js
        const mockOptions = [
            { value: 'Option1', label: 'Option1', },
            { value: 'Option2', label: 'Option2', },
            { value: 'Option3', label: 'Option3', },
            { value: 'Option4', label: 'Option4', },
            { value: 'Option5', label: 'Option5', },
        ];
        
        <Select clearable>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
        ~~~`)
);

/**
|--------------------------------------------------
| Custom Template
|--------------------------------------------------
*/
stories.add(
    'Custom Template',
    () => (
        <Select>
            {mockOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                    <span style={{ float: 'left' }}>{option.label}</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                        {option.value}
                    </span>
                </Select.Option>
            ))}
        </Select>
    ),
    wInfo(`
        ### Notes

        You can render custom options by providing it via **\`children\`** to **\`Select.Option\`**.
        
        If no children are provided, it will use the option's **\`label\`**.
        
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
                <Select.Option key={option.value} value={option.value} label={option.label}>
                    <span style={{ float: 'left' }}>{option.label}</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                        {option.value}
                    </span>
                </Select.Option>
            ))}
        </Select>
        ~~~`)
);

export default stories;
