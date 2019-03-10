import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { mockOptions } from './mockData';

const DisabledSelect = (stories: any) => {
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
};

export default DisabledSelect;
