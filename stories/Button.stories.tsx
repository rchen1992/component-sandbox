import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../src/Button/Button';
import { wInfo } from '../src/utils';
import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

const actions = {
    onClick: action('onClick'),
};

export default (storiesOf('Components/Button', module) as any).add(
    'basic Button',
    () => (
        <Button
            label={text('label', 'Enroll')}
            disabled={boolean('disabled', false)}
            {...actions}
        />
    ),
    wInfo(`
            ### Notes

            This is a button!

            ### Usage
            ~~~js
            <Button
                label={'Enroll'}
                disabled={false}
                onClick={() => alert('hello there')}
            />
            ~~~`)
);
