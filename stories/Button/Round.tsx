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
                <Button round buttonType="primary" {...actions}>
                    Primary
                </Button>
                <Button round buttonType="success" {...actions}>
                    Success
                </Button>
                <Button round buttonType="info" {...actions}>
                    Info
                </Button>
                <Button round buttonType="warning" {...actions}>
                    Warning
                </Button>
                <Button round buttonType="danger" {...actions}>
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
        <Button round buttonType='primary'>Primary</Button>
        <Button round buttonType='success'>Success</Button>
        <Button round buttonType='info'>Info</Button>
        <Button round buttonType='warning'>Warning</Button>
        <Button round buttonType='danger'>Danger</Button>
        ~~~`)
    );
};

export default Round;
