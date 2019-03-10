import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';
import { Container } from './util';

const Plain = (stories: any) => {
    stories.add(
        'Plain Variation',
        () => (
            <Container>
                <Button plain {...actions}>
                    Primary
                </Button>
                <Button plain type="primary" {...actions}>
                    Primary
                </Button>
                <Button plain type="success" {...actions}>
                    Success
                </Button>
                <Button plain type="info" {...actions}>
                    Info
                </Button>
                <Button plain type="warning" {...actions}>
                    Warning
                </Button>
                <Button plain type="danger" {...actions}>
                    Danger
                </Button>
            </Container>
        ),
        wInfo(`
        ### Notes

        Plain Button Types.

        ### Usage
        ~~~js
        <Button plain>Default</Button>
        <Button plain type='primary'>Primary</Button>
        <Button plain type='success'>Success</Button>
        <Button plain type='info'>Info</Button>
        <Button plain type='warning'>Warning</Button>
        <Button plain type='danger'>Danger</Button>
        ~~~`)
    );
};

export default Plain;
