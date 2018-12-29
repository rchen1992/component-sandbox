import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Checkbox from '../src/Checkbox';
import { wInfo } from '../src/utils';
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

export default stories;
