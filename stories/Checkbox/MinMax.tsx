import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const MinMax = (stories: any) => {
    const MinMax = () => {
        const [value, setValue] = React.useState(['option1', 'option2', 'option3']);

        return (
            <Checkbox.Group
                value={value}
                onChange={value => {
                    setValue(value);
                }}
                min={2}
                max={4}
            >
                <Checkbox style={formatStyles} value="option1">
                    Option 1
                </Checkbox>
                <Checkbox style={formatStyles} value="option2">
                    Option 2
                </Checkbox>
                <Checkbox style={formatStyles} value="option3">
                    Option 3
                </Checkbox>
                <Checkbox style={formatStyles} value="option4">
                    Option 4
                </Checkbox>
                <Checkbox style={formatStyles} value="option5">
                    Option 5
                </Checkbox>
                <Checkbox value="option6">Option 6</Checkbox>
            </Checkbox.Group>
        );
    };
    stories.add(
        'Checkbox Group Min/Max',
        () => <MinMax />,
        wInfo(`
        ### Notes

        Use the **\`min\`** and **\`max\`** props to put constraints on the number of boxes that are checked at the same time.

        ### Usage
        ~~~js
        const MinMax = () => {
            const [value, setValue] = React.useState(['option1', 'option3', 'option6']);

            return (
                <Checkbox.Group
                    value={value}
                    onChange={value => {
                        setValue(value);
                    }}
                    min={2}
                    min={4}
                >
                    <Checkbox value="option1">Option 1</Checkbox>
                    <Checkbox value="option2">Option 2</Checkbox>
                    <Checkbox value="option3">Option 3</Checkbox>
                    <Checkbox value="option4">Option 4</Checkbox>
                    <Checkbox value="option5">Option 5</Checkbox>
                    <Checkbox value="option6">Option 6</Checkbox>
                </Checkbox.Group>
            );
        };
        ~~~
        `)
    );
};

export default MinMax;
