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

/**
|--------------------------------------------------
| Button Sizes
|--------------------------------------------------
*/
stories.add(
    'Button Sizes',
    () => (
        <Container>
            <Button {...actions}>Default</Button>
            <Button buttonSize="medium" {...actions}>
                Medium
            </Button>
            <Button buttonSize="small" {...actions}>
                Small
            </Button>
            <Button buttonSize="mini" {...actions}>
                Mini
            </Button>
        </Container>
    ),
    wInfo(`
        ### Notes

        Different Button Sizes.

        ### Usage
        ~~~js
        <Button>Default</Button>
        <Button buttonSize='medium'>Medium</Button>
        <Button buttonSize='small'>Small</Button>
        <Button buttonSize='mini'>Mini</Button>
        ~~~`)
);

/**
|--------------------------------------------------
| Plain Buttons
|--------------------------------------------------
*/
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

/**
|--------------------------------------------------
| Round Buttons
|--------------------------------------------------
*/
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

/**
|--------------------------------------------------
| Disabled Buttons
|--------------------------------------------------
*/
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

export default stories;
