import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';

const Textarea = (stories: any) => {
    stories.add(
        'Textarea',
        () => (
            <>
                <Input
                    placeholder="Enter text here..."
                    type="textarea"
                    autosize={{ minRows: 2, maxRows: 4 }}
                    style={{ marginBottom: '20px', display: 'block' }}
                />

                <Input
                    placeholder="Enter text here..."
                    type="textarea"
                    disabled
                    style={{ marginBottom: '20px', display: 'block' }}
                />

                <Input
                    placeholder="Enter text here..."
                    type="textarea"
                    autosize
                    prepend="Prepend"
                    append="Append"
                />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`type\`** of **\`textarea\`** to change input to textarea.

        Use **\`autosize\`** to specify the minimum and maximum number of rows,
        and the textarea will automatically resize based on those constraints.
        You can also set **\`autosize\`** to **\`true\`** to always resize.

        Other input props should still work with type textarea.

        ### Usage
        ~~~js
        <Input
            type="textarea"
            placeholder="Enter text here..."
            autosize={{ minRows: 2, maxRows: 4 }}
        />

        <Input
            type="textarea"
            placeholder="Enter text here..."
            disabled
        />

        <Input
            type="textarea"
            placeholder="Enter text here..."
            autosize
            prepend="Prepend"
            append="Append"
        />
        ~~~`)
    );
};

export default Textarea;
