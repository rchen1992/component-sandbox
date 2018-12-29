import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Checkbox from '../src/Checkbox';
import { wInfo } from '../src/utils';
import { action } from '@storybook/addon-actions';
// import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components/Checkbox', module) as any;

const formatStyles = {
    marginRight: '12px',
};

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => (
        <>
            <Checkbox defaultChecked value="option1">
                Option 1
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Basic Checkbox. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.

        Use **\`value\`** to set a value on the checkbox input.

        ### Usage
        ~~~js
        <Checkbox defaultChecked value="option1">Option 1</Checkbox>
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled
|--------------------------------------------------
*/
stories.add(
    'Disabled',
    () => (
        <>
            <Checkbox disabled style={formatStyles}>
                Option 1
            </Checkbox>
            <Checkbox disabled defaultChecked>
                Option 2
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.

        ### Usage
        ~~~js
        <Checkbox disabled>Option 1</Checkbox>
        <Checkbox disabled defaultChecked>Option 2</Checkbox>
        ~~~`)
);

/**
|--------------------------------------------------
| Indeterminate
|--------------------------------------------------
*/
stories.add(
    'Indeterminate',
    () => (
        <>
            <Checkbox indeterminate style={formatStyles}>
                Option 1
            </Checkbox>
            <Checkbox indeterminate disabled>
                Option 2
            </Checkbox>
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`indeterminate\`** to set an indeterminate state.

        ### Usage
        ~~~js
        <Checkbox indeterminate>Option 1</Checkbox>
        <Checkbox indeterminate disabled >Option 2</Checkbox>
        ~~~`)
);

/**
|--------------------------------------------------
| onChange
|--------------------------------------------------
*/
stories.add(
    'onChange',
    () => (
        <Checkbox
            value="option1"
            onChange={(e, data) => {
                console.log(data);
                action('onChange')(e);
            }}
        >
            Option 1
        </Checkbox>
    ),
    wInfo(`
        ### Notes

        You can attach an **\`onChange\`** handler to the input.

        The first parameter for the handler will be the React change event.

        The second parameter will be a **\`data\`** payload containing **\`prevChecked\`** and the input **\`value\`**.

        ### Usage
        ~~~js
        <Checkbox
            value="option1"
            onChange={(e, data) => {
                console.log(data);
                action('onChange')(e);
            }}
        >
            Option 1
        </Checkbox>
        ~~~`)
);

/**
|--------------------------------------------------
| Checkbox Group
|--------------------------------------------------
*/
const CheckboxGroupContainer = () => {
    const [value, setValue] = React.useState(['option1', 'option3', 'option6']);

    return (
        <Checkbox.Group
            value={value}
            onChange={value => {
                setValue(value);
            }}
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
    'Checkbox Group',
    () => <CheckboxGroupContainer />,
    wInfo(`
        ### Notes

        A Checkbox Group manages multiple checkboxes.

        Use the **\`value\`** prop on the checkbox group to specify an array of strings.
        If the **\`value\`** of the checkbox exists in the **\`value\`** array of the checkbox group,
        that checkbox will be checked.

        Attach an **\`onChange\`** handler to receive the updated **\`value\`** list whenever a checkbox changes.

        ### Usage
        ~~~js
        const CheckboxGroupContainer = () => {
            const [value, setValue] = React.useState(['option1', 'option3', 'option6']);

            return (
                <Checkbox.Group
                    value={value}
                    onChange={value => {
                        setValue(value);
                    }}
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

/**
|--------------------------------------------------
| Checkbox Group Min/Max
|--------------------------------------------------
*/
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

/**
|--------------------------------------------------
| Check all
|--------------------------------------------------
*/
const CheckAll = () => {
    const [fruits] = React.useState(['Apple', 'Orange', 'Pear', 'Mango']);
    const [checkAll, setCheckAll] = React.useState(false);
    const [checkedFruits, setCheckedFruits] = React.useState(['Apple', 'Orange']);
    const [isIndeterminate, setIsIndeterminate] = React.useState(true);

    function onCheckAllChange(e: React.ChangeEvent, data: any) {
        const checkedFruits = !data.prevChecked ? fruits : [];

        setIsIndeterminate(false);
        setCheckAll(!data.prevChecked);
        setCheckedFruits(checkedFruits);
    }

    function onCheckboxGroupChange(value: string[]) {
        const checkedCount = value.length;

        setCheckedFruits(value);
        setCheckAll(checkedCount === fruits.length);
        setIsIndeterminate(checkedCount > 0 && checkedCount < fruits.length);
    }

    return (
        <>
            <Checkbox
                checked={checkAll}
                indeterminate={isIndeterminate}
                onChange={onCheckAllChange}
                style={{ marginBottom: '10px' }}
            >
                Check all
            </Checkbox>
            <Checkbox.Group value={checkedFruits} onChange={onCheckboxGroupChange}>
                {fruits.map((fruit: string) => (
                    <Checkbox key={fruit} value={fruit} style={formatStyles}>
                        {fruit}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </>
    );
};

stories.add(
    'Check all',
    () => <CheckAll />,
    wInfo(`
        ### Notes

        Example of implementing "check all" functionality.
        
        ### Usage
        ~~~js
        const CheckAll = () => {
            const [fruits] = React.useState(['Apple', 'Orange', 'Pear', 'Mango']);
            const [checkAll, setCheckAll] = React.useState(false);
            const [checkedFruits, setCheckedFruits] = React.useState(['Apple', 'Orange']);
            const [isIndeterminate, setIsIndeterminate] = React.useState(true);

            function onCheckAllChange(e, data) {
                const checkedFruits = !data.prevChecked ? fruits : [];

                setIsIndeterminate(false);
                setCheckAll(!data.prevChecked);
                setCheckedFruits(checkedFruits);
            }

            function onCheckboxGroupChange(value) {
                const checkedCount = value.length;

                setCheckedFruits(value);
                setCheckAll(checkedCount === fruits.length);
                setIsIndeterminate(checkedCount > 0 && checkedCount < fruits.length);
            }

            return (
                <>
                    <Checkbox
                        checked={checkAll}
                        indeterminate={isIndeterminate}
                        onChange={onCheckAllChange}
                    >
                        Check all
                    </Checkbox>
                    <Checkbox.Group value={checkedFruits} onChange={onCheckboxGroupChange}>
                        {fruits.map((fruit) => (
                            <Checkbox key={fruit} value={fruit}>
                                {fruit}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </>
            );
        };
        ~~~`)
);

export default stories;
