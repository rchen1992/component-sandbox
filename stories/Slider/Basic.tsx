import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

function BasicSlider() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>Current value: {value}</div>
            <Slider onChange={val => setValue(val)} style={{ width: '50%' }} />
        </div>
    );
}

const Basic = (stories: any) => {
    stories.add(
        'Basic',
        () => <BasicSlider />,
        wInfo(`
        ### Notes

        Basic Slider.

        Use **\`onChange\`** to get updated values whenever slider changes.

        ### Usage
        ~~~js
        function BasicSlider() {
            const [value, setValue] = React.useState(0);

            return (
                <div style={{ marginLeft: '20px' }}>
                    <div>Current value: {value}</div>
                    <Slider onChange={val => setValue(val)} style={{ width: '50%' }} />
                </div>
            );
        }
        ~~~`)
    );
};

export default Basic;
