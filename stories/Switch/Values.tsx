import * as React from 'react';
import Switch from '../../src/Switch';
import { wInfo } from '../../src/utils';

const Values = (stories: any) => {
    const offValue = 'value is off';
    const onValue = 'value is on';

    const SwitchValueDisplay = () => {
        const [value, setValue] = React.useState(offValue);
        return (
            <>
                <div>{value}</div>
                <Switch
                    offValue={offValue}
                    onValue={onValue}
                    onClick={(e, data) => setValue(data.value as string)}
                />
            </>
        );
    };

    stories.add(
        'Values',
        () => <SwitchValueDisplay />,
        wInfo(`
        ### Notes

        Use **\`offValue\`** and **\`onValue\`** to set the value for the on/off states of the switch input.

        ### Usage
        ~~~js
        <Switch
            offValue="value is off"
            onValue="value is on"
        />
        ~~~

        ### Sample code
        ~~~js
        const offValue = 'value is off';
        const onValue = 'value is on';

        const SwitchValueDisplay = () => {
            const [value, setValue] = React.useState(offValue);
            return (
                <>
                    <div>{value}</div>
                    <Switch
                        offValue={offValue}
                        onValue={onValue}
                        onClick={(e, data) => setValue(data.value)}
                    />
                </>
            );
        };
        ~~~`)
    );
};

export default Values;
