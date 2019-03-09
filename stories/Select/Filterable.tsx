import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { filterOptions } from './mockData';

const Filterable = (stories: any) => {
    stories.add(
        'Filterable',
        () => (
            <Select filterable>
                {filterOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        ),
        wInfo(`
        ### Notes

        Filterable select.

        Add **\`filterable\`** prop to allow filtering of options via the input.
        
        ### Usage
        ~~~js
        const filterOptions = [
            { value: 'Apple', label: 'Apple', },
            { value: 'Alligator', label: 'Alligator', },
            { value: 'Alliance', label: 'Alliance', },
            { value: 'Apologize', label: 'Apologize', },
            { value: 'Application', label: 'Application', },
            { value: 'Bunny', label: 'Bunny', },
            { value: 'Cherry', label: 'Cherry', },
        ];
        
        <Select filterable>
            {filterOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label} />
            ))}
        </Select>
        ~~~`)
    );
};

export default Filterable;
