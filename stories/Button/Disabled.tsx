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
                <Button disabled buttonType="primary" {...actions}>
                    Primary
                </Button>
                <Button disabled buttonType="success" {...actions}>
                    Success
                </Button>
                <Button disabled buttonType="info" {...actions}>
                    Info
                </Button>
                <Button disabled buttonType="warning" {...actions}>
                    Warning
                </Button>
                <Button disabled buttonType="danger" {...actions}>
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
        <Button disabled buttonType='primary'>Primary</Button>
        <Button disabled buttonType='success'>Success</Button>
        <Button disabled buttonType='info'>Info</Button>
        <Button disabled buttonType='warning'>Warning</Button>
        <Button disabled buttonType='danger'>Danger</Button>
        ~~~`)
    );
};

export default Disabled;
