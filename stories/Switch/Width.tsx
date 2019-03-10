import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';

const Width = (stories: any) => {
    stories.add(
        'Width',
        () => (
            <>
                <Switch width={70} />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`width\`** set a custom width in px.

        ### Usage
        ~~~js
        <Switch width={70} />
        ~~~`)
    );
};

export default Width;
