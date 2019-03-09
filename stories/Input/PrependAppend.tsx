import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';

const PrependAppend = (stories: any) => {
    stories.add(
        'Prepend/Append',
        () => (
            <>
                <Input placeholder="website" prepend="https://" append=".com" />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`prepend\`** and **\`append\`** to prepend/append text to the input.

        ### Usage
        ~~~js
        <Input placeholder="website" prepend="https://" append=".com" />
        ~~~`)
    );
};

export default PrependAppend;
