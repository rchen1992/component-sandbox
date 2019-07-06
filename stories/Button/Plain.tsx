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
                <Button plain buttonType="primary" {...actions}>
                    Primary
                </Button>
                <Button plain buttonType="success" {...actions}>
                    Success
                </Button>
                <Button plain buttonType="info" {...actions}>
                    Info
                </Button>
                <Button plain buttonType="warning" {...actions}>
                    Warning
                </Button>
                <Button plain buttonType="danger" {...actions}>
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
        <Button plain buttonType='primary'>Primary</Button>
        <Button plain buttonType='success'>Success</Button>
        <Button plain buttonType='info'>Info</Button>
        <Button plain buttonType='warning'>Warning</Button>
        <Button plain buttonType='danger'>Danger</Button>
        ~~~`)
    );
};

export default Plain;
