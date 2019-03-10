import * as React from 'react';
import Button from '../../src/Button';
import { wInfo } from '../../src/utils';
import actions from './actions';
import { Container } from './util';

const ButtonSizes = (stories: any) => {
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
};

export default ButtonSizes;
