import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';
import { Container } from './util';

const Round = (stories: any) => {
    stories.add(
        'Round Variation',
        () => (
            <Container>
                <Button round {...actions}>
                    Default
                </Button>
                <Button round type="primary" {...actions}>
                    Primary
                </Button>
                <Button round type="success" {...actions}>
                    Success
                </Button>
                <Button round type="info" {...actions}>
                    Info
                </Button>
                <Button round type="warning" {...actions}>
                    Warning
                </Button>
                <Button round type="danger" {...actions}>
                    Danger
                </Button>
            </Container>
        ),
        wInfo(`
        ### Notes

        Round Button Types.

        ### Usage
        ~~~js
        <Button round>Default</Button>
        <Button round type='primary'>Primary</Button>
        <Button round type='success'>Success</Button>
        <Button round type='info'>Info</Button>
        <Button round type='warning'>Warning</Button>
        <Button round type='danger'>Danger</Button>
        ~~~`)
    );
};

export default Round;
