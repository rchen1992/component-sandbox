import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';

const Basic = (stories: any) => {
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
};

export default Basic;
