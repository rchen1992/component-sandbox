import * as React from 'react';
import Slider from '../../src/Slider';
import { wInfo } from '../../src/utils';

const min = -100;
const max = 100;
const startingValue = 50;

function MinMaxSlider() {
    const [value, setValue] = React.useState(startingValue);

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>Min value: {min}</div>
            <div>Max value: {max}</div>
            <div>Current value: {value}</div>

            <Slider
                startingValue={startingValue}
                min={min}
                max={max}
                onChange={val => setValue(val)}
                style={{ width: '50%' }}
            />
        </div>
    );
}

const MinMax = (stories: any) => {
    stories.add(
        'MinMax',
        () => <MinMaxSlider />,
        wInfo(`
        ### Notes

        Use **\`min\`** and **\`max\`** props to set custom min/max values for the slider.

        Use **\`startingValue\`** prop to set default starting value for slider.

        ### Usage
        ~~~js
        const min = -100;
        const max = 100;
        const startingValue = 50;
        
        function MinMaxSlider() {
            const [value, setValue] = React.useState(startingValue);

            return (
                <div style={{ marginLeft: '20px' }}>
                    <div>Min value: {min}</div>
                    <div>Max value: {max}</div>
                    <div>Current value: {value}</div>

                    <Slider
                        startingValue={startingValue}
                        min={min}
                        max={max}
                        onChange={val => setValue(val)}
                        style={{ width: '50%' }}
                    />
                </div>
            );
        }
        ~~~`)
    );
};

export default MinMax;
