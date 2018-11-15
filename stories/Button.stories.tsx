import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Button from '../src/Button';
import { wInfo } from '../src/utils';
// import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

const actions = {
    onClick: action('onClick'),
};

export default (storiesOf('Components/Button', module) as any).add(
    'Default',
    () => <Button {...actions}>Default</Button>,
    wInfo(`
        ### Notes

        Default button.

        ### Usage
        ~~~js
        <Button
            onClick={() => {}}
        />
        ~~~`)
);
