import * as React from 'react';
import Checkbox from '../../src/Checkbox';
import { wInfo } from '../../src/utils';

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => (
            <>
                <Checkbox defaultChecked value="option1">
                    Option 1
                </Checkbox>
            </>
        ),
        wInfo(`
        ### Notes

        Basic Checkbox. 
        
        Use **\`defaultChecked\`** to set a default starting on/off state.

        Use **\`value\`** to set a value on the checkbox input.

        ### Usage
        ~~~js
        <Checkbox defaultChecked value="option1">Option 1</Checkbox>
        ~~~`)
    );
};

export default Basic;
