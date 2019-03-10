import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Disabled = (stories: any) => {
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
};

export default Disabled;
