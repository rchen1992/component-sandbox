import * as React from 'react';
import Radio from '../../src/Radio';
import { wInfo } from '../../src/utils';

const Disabled = (stories: any) => {
    stories.add(
        'Disabled',
        () => <Radio disabled>Option</Radio>,
        wInfo(`
        ### Notes

        Use **\`disabled\`** to set disabled state.

        ### Usage
        ~~~js
        <Radio disabled>Option</Radio>
        ~~~`)
    );
};

export default Disabled;
