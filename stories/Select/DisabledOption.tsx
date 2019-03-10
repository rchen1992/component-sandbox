import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { mockOptionsWithDisabled } from './mockData';

const DisabledOption = (stories: any) => {
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
};

export default DisabledOption;
