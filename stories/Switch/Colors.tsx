import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Colors = (stories: any) => {
    stories.add(
        'Colors',
        () => (
            <>
                <Switch offColor="#F3451F" onColor="#2ECC71" style={formatStyles} />
                <Switch defaultChecked={true} offColor="#F7DC6F" onColor="#BB8FCE" />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`onColor\`** and **\`offColor\`** to set the colors for the on/off states.

        ### Usage
        ~~~js
        <Switch offColor="#F3451F" onColor="#2ECC71" />
        <Switch defaultChecked={true} offColor="#F7DC6F" onColor="#BB8FCE" />
        ~~~`)
    );
};

export default Colors;
