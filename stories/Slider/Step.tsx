import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

function StepSlider() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>Current value: {value}</div>
            <Slider step={10} showStops onChange={val => setValue(val)} style={{ width: '50%' }} />
        </div>
    );
}

const Step = (stories: any) => {
    stories.add(
        'Step',
        () => <StepSlider />,
        wInfo(`
        ### Notes

        Slider with discrete values.

        Use **\`step\`** prop to specify the step between each valid value.

        Use **\`showStops\`** prop to render the actual breakpoints.

        ### Usage
        ~~~js
        function StepSlider() {
            const [value, setValue] = React.useState(0);

            return (
                <div style={{ marginLeft: '20px' }}>
                    <div>Current value: {value}</div>
                    <Slider step={10} showStops onChange={val => setValue(val)} style={{ width: '50%' }} />
                </div>
            );
        }
        ~~~`)
    );
};

export default Step;
