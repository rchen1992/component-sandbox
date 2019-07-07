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
                <Button buttonType="primary" {...actions}>
                    Primary
                </Button>
                <Button buttonType="success" {...actions}>
                    Success
                </Button>
                <Button buttonType="info" {...actions}>
                    Info
                </Button>
                <Button buttonType="warning" {...actions}>
                    Warning
                </Button>
                <Button buttonType="danger" {...actions}>
                    Danger
                </Button>
                <Button buttonType="text" {...actions}>
                    Text
                </Button>
            </Container>
        ),
        wInfo(`
        ### Notes

        Different Button Types.

        ### Usage
        ~~~js
        <Button buttonType='primary'>Primary</Button>
        <Button buttonType='success'>Success</Button>
        <Button buttonType='info'>Info</Button>
        <Button buttonType='warning'>Warning</Button>
        <Button buttonType='danger'>Danger</Button>
        <Button buttonType='text'>Text</Button>
        ~~~`)
    );
};

export default ButtonTypes;
