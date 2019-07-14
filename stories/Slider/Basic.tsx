import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => (
            <div style={{ marginLeft: '20px' }}>
                <Slider onChange={val => console.log(val)} />
            </div>
        ),
        wInfo(`
        ### Notes

        Basic Slider.

        ### Usage
        ~~~js

        ~~~`)
    );
};

export default Basic;
