import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

function DisabledSlider() {
    const [value, setValue] = React.useState(50);

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>Current value: {value}</div>
            <Slider
                disabled
                startingValue={50}
                onChange={val => setValue(val)}
                style={{ width: '50%' }}
            />
        </div>
    );
}

const Disabled = (stories: any) => {
    stories.add(
        'Disabled',
        () => <DisabledSlider />,
        wInfo(`
        ### Notes

        Use **\`disabled\`** prop to disable slider.

        ### Usage
        ~~~js
        function DisabledSlider() {
            const [value, setValue] = React.useState(50);

            return (
                <div style={{ marginLeft: '20px' }}>
                    <div>Current value: {value}</div>
                    <Slider
                        disabled
                        startingValue={50}
                        onChange={val => setValue(val)}
                        style={{ width: '50%' }}
                    />
                </div>
            );
        }
        ~~~`)
    );
};

export default Disabled;
