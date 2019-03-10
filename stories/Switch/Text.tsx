import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';

const Text = (stories: any) => {
    stories.add(
        'Text',
        () => (
            <>
                <Switch offText="This is off" onText="This is on" textClassName="my-text" />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`offText\`** and **\`onText\`** to set text descriptions for the on/off states.

        Use **\`textClassName\`** to set a className on the both text elements.

        ### Usage
        ~~~js
        <Switch
            offText="This is off"
            onText="This is on"
            textClassName="my-text"
        />
        ~~~`)
    );
};

export default Text;
