import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Indeterminate = (stories: any) => {
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
};

export default Indeterminate;
