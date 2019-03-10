import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Disabled = (stories: any) => {
    stories.add(
        'Disabled',
        () => (
            <>
                <Switch disabled style={formatStyles} />
                <Switch disabled defaultChecked={true} />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled switch state.

        ### Usage
        ~~~js
        <Switch disabled />
        <Switch disabled defaultChecked={true} />
        ~~~`)
    );
};

export default Disabled;
