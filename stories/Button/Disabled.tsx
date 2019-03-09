import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';
import { Container } from './util';

const Disabled = (stories: any) => {
    stories.add(
        'Disabled',
        () => (
            <Container>
                <Button disabled {...actions}>
                    Default
                </Button>
                <Button disabled type="primary" {...actions}>
                    Primary
                </Button>
                <Button disabled type="success" {...actions}>
                    Success
                </Button>
                <Button disabled type="info" {...actions}>
                    Info
                </Button>
                <Button disabled type="warning" {...actions}>
                    Warning
                </Button>
                <Button disabled type="danger" {...actions}>
                    Danger
                </Button>
            </Container>
        ),
        wInfo(`
        ### Notes

        Disabled Button Types.

        ### Usage
        ~~~js
        <Button disabled>Default</Button>
        <Button disabled type='primary'>Primary</Button>
        <Button disabled type='success'>Success</Button>
        <Button disabled type='info'>Info</Button>
        <Button disabled type='warning'>Warning</Button>
        <Button disabled type='danger'>Danger</Button>
        ~~~`)
    );
};

export default Disabled;
