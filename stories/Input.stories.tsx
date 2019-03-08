import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Input from '../src/Input';
import { wInfo } from '../src/utils';

const stories = storiesOf('Components/Input', module) as any;

const formatStyles = {
    marginRight: '8px',
};

/**
|--------------------------------------------------
| Basic
|--------------------------------------------------
*/
stories.add(
    'Basic',
    () => <Input placeholder="Please input" />,
    wInfo(`
        ### Notes

        Basic Input. 
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" />
        ~~~`)
);

/**
|--------------------------------------------------
| Disabled
|--------------------------------------------------
*/
stories.add(
    'Disabled',
    () => <Input placeholder="Please input" disabled />,
    wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" disabled />
        ~~~`)
);

/**
|--------------------------------------------------
| Sizes
|--------------------------------------------------
*/
stories.add(
    'Sizes',
    () => (
        <>
            <Input placeholder="Please input" style={formatStyles} inputSize="large" />
            <Input placeholder="Please input" style={formatStyles} />
            <Input placeholder="Please input" style={formatStyles} inputSize="small" />
            <Input placeholder="Please input" inputSize="mini" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`inputSize\`** to set input sizes.

        Available sizes (other than default) are **\`large\`**, **\`small\`**, and **\`mini\`**.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" inputSize="large" />
        <Input placeholder="Please input" />
        <Input placeholder="Please input" inputSize="small" />
        <Input placeholder="Please input" inputSize="mini" />
        ~~~`)
);

/**
|--------------------------------------------------
| Icon
|--------------------------------------------------
*/
stories.add(
    'Icon',
    () => (
        <>
            <Input placeholder="Please input" icon="time" inputSize="large" style={formatStyles} />
            <Input placeholder="Please input" icon="edit" style={formatStyles} />
            <Input placeholder="Please input" icon="search" inputSize="small" />
            <div style={{ marginTop: '10px' }}>
                <Input placeholder="Please input" icon="date" iconSize={12} />
            </div>
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`icon\`** to render an icon within the input.

        By default, the icon's size will inherit from the **\`inputSize\`** prop.
        However, you can provide **\`iconSize\`** to fully control the size of the icon.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" icon="time" inputSize="large" />
        <Input placeholder="Please input" icon="edit" />
        <Input placeholder="Please input" icon="search" inputSize="small" />
        <Input placeholder="Please input" icon="date" iconSize={12} />
        ~~~`)
);

/**
|--------------------------------------------------
| Prepend/Append
|--------------------------------------------------
*/
stories.add(
    'Prepend/Append',
    () => (
        <>
            <Input placeholder="website" prepend="https://" append=".com" />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`prepend\`** and **\`append\`** to prepend/append text to the input.

        ### Usage
        ~~~js
        <Input placeholder="website" prepend="https://" append=".com" />
        ~~~`)
);

/**
|--------------------------------------------------
| Textarea
|--------------------------------------------------
*/
stories.add(
    'Textarea',
    () => (
        <>
            <Input
                placeholder="Enter text here..."
                type="textarea"
                autosize={{ minRows: 2, maxRows: 4 }}
                style={{ marginBottom: '20px', display: 'block' }}
            />

            <Input
                placeholder="Enter text here..."
                type="textarea"
                disabled
                style={{ marginBottom: '20px', display: 'block' }}
            />

            <Input
                placeholder="Enter text here..."
                type="textarea"
                autosize
                prepend="Prepend"
                append="Append"
            />
        </>
    ),
    wInfo(`
        ### Notes

        Use **\`type\`** of **\`textarea\`** to change input to textarea.

        Use **\`autosize\`** to specify the minimum and maximum number of rows,
        and the textarea will automatically resize based on those constraints.
        You can also set **\`autosize\`** to **\`true\`** to always resize.

        Other input props should still work with type textarea.

        ### Usage
        ~~~js
        <Input
            type="textarea"
            placeholder="Enter text here..."
            autosize={{ minRows: 2, maxRows: 4 }}
        />

        <Input
            type="textarea"
            placeholder="Enter text here..."
            disabled
        />

        <Input
            type="textarea"
            placeholder="Enter text here..."
            autosize
            prepend="Prepend"
            append="Append"
        />
        ~~~`)
);

export default stories;
