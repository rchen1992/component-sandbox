import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';

const Disabled = (stories: any) => {
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
};

export default Disabled;
