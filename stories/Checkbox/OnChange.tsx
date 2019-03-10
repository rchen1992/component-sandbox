import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';
import { action } from '@storybook/addon-actions';

const OnChange = (stories: any) => {
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
};

export default OnChange;
