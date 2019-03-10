import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Icon = (stories: any) => {
    stories.add(
        'Icon',
        () => (
            <>
                <Input
                    placeholder="Please input"
                    icon="time"
                    inputSize="large"
                    style={formatStyles}
                />
                <Input placeholder="Please input" icon="edit" style={formatStyles} />
                <Input placeholder="Please input" icon="search" inputSize="small" />
                <div style={{ marginTop: '10px' }}>
                    <Input placeholder="Please input" icon="date" iconSize={12} />
                </div>
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`icon\`** to render an icon within the input.

        By default, the icon's size will inherit from the **\`inputSize\`** prop.
        However, you can provide **\`iconSize\`** to fully control the size of the icon.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" icon="time" inputSize="large" />
        <Input placeholder="Please input" icon="edit" />
        <Input placeholder="Please input" icon="search" inputSize="small" />
        <Input placeholder="Please input" icon="date" iconSize={12} />
        ~~~`)
    );
};

export default Icon;
