import * as React from 'react';
import Select from '../../src/Select';
import { wInfo } from '../../src/utils';
import { mockOptionsWithDifferingValuesFromLabels } from './mockData';

const CustomTemplate = (stories: any) => {
    stories.add(
        'Custom Template',
        () => (
            <Select>
                {mockOptionsWithDifferingValuesFromLabels.map(option => (
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
            { value: 'Hello', label: 'Option1', },
            { value: 'World', label: 'Option2', },
            { value: 'Foo', label: 'Option3', },
            { value: 'Bar', label: 'Option4', },
            { value: 'Baz', label: 'Option5', },
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
};

export default CustomTemplate;
