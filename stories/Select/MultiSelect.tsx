import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { mockOptions } from './mockData';

const MultiSelect = (stories: any) => {
    stories.add(
        'Multi-Select',
        () => (
            <Select multiple>
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
};

export default MultiSelect;
