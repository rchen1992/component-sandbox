import * as React from 'react';
import Input from '../../src/Input';
import { wInfo } from '../../src/utils';
import { formatStyles } from './util';

const Sizes = (stories: any) => {
    stories.add(
        'Sizes',
        () => (
            <>
                <Input placeholder="Please input" style={formatStyles} inputSize="large" />
                <Input placeholder="Please input" style={formatStyles} />
                <Input placeholder="Please input" style={formatStyles} inputSize="small" />
                <Input placeholder="Please input" inputSize="mini" />
            </>
        ),
        wInfo(`
        ### Notes

        Use **\`inputSize\`** to set input sizes.

        Available sizes (other than default) are **\`large\`**, **\`small\`**, and **\`mini\`**.
        
        ### Usage
        ~~~js
        <Input placeholder="Please input" inputSize="large" />
        <Input placeholder="Please input" />
        <Input placeholder="Please input" inputSize="small" />
        <Input placeholder="Please input" inputSize="mini" />
        ~~~`)
    );
};

export default Sizes;
