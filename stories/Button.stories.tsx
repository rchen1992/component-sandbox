import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Button from '../src/Button';
import { wInfo } from '../src/utils';
// import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

const actions = {
    onClick: action('onClick'),
};

// Helper wrapping container to space out buttons
const Container = styled.div`
    & > button {
        margin-right: 6px;
    }
`;

const stories = storiesOf('Components/Button', module) as any;

/**
|--------------------------------------------------
| Default
|--------------------------------------------------
*/
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

/**
|--------------------------------------------------
| Button Types
|--------------------------------------------------
*/
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

export default stories;
