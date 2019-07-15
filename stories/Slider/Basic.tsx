import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

function SliderSample() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>Current value: {value}</div>
            <Slider startingValue={value} onChange={val => setValue(val)} />
        </div>
    );
}

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => <SliderSample />,
        wInfo(`
        ### Notes

        Basic Slider.

        ### Usage
        ~~~js

        ~~~`)
    );
};

export default Basic;
