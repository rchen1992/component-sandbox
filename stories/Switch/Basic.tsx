import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => (
            <>
                <Switch style={formatStyles} />
                <Switch defaultChecked={true} />
            </>
        ),
        wInfo(`
        ### Notes

        Basic Switch. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.
        
        Use **\`checked\`** to force an on or off state.

        ### Usage
        ~~~js
        <Switch />
        <Switch defaultChecked={true} />
        ~~~`)
    );
};

export default Basic;
