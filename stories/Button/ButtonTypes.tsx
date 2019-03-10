import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';
import { Container } from './util';

const ButtonTypes = (stories: any) => {
    stories.add(
        'Button Types',
        () => (
            <Container>
                <Button type="primary" {...actions}>
                    Primary
                </Button>
                <Button type="success" {...actions}>
                    Success
                </Button>
                <Button type="info" {...actions}>
                    Info
                </Button>
                <Button type="warning" {...actions}>
                    Warning
                </Button>
                <Button type="danger" {...actions}>
                    Danger
                </Button>
                <Button type="text" {...actions}>
                    Text
                </Button>
            </Container>
        ),
        wInfo(`
        ### Notes

        Different Button Types.

        ### Usage
        ~~~js
        <Button type='primary'>Primary</Button>
        <Button type='success'>Success</Button>
        <Button type='info'>Info</Button>
        <Button type='warning'>Warning</Button>
        <Button type='danger'>Danger</Button>
        <Button type='text'>Text</Button>
        ~~~`)
    );
};

export default ButtonTypes;
