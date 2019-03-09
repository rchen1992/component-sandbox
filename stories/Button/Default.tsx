import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';

const Default = (stories: any) => {
    stories.add(
        'Default',
        () => <Button {...actions}>Default</Button>,
        wInfo(`
        ### Notes

        Default button.

        ### Usage
        ~~~js
        <Button onClick={() => {}}>Default</Button>
        ~~~`)
    );
};

export default Default;
