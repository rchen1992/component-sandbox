import * as React from 'react';

import { storiesOf } from '@storybook/react';
// import { boolean, color, object, select, text } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
import { wInfo } from '../src/utils';
import { Row, Col } from '../src/Grid';

const stories = storiesOf('Components/Grid', module) as any;

stories.add(
    'Layout',
    () => (
        <>
            <Row>
                <Col span={6}>Hello</Col>
                <Col span={6}>Hello</Col>
                <Col span={6}>Hello</Col>
                <Col span={6}>Hello</Col>
            </Row>
            <Row>
                <Col span={8}>Hello</Col>
                <Col span={8}>Hello</Col>
                <Col span={8}>Hello</Col>
            </Row>
            <Row>
                <Col span={6} offset={6}>
                    Hello
                </Col>
                <Col span={6} offset={6}>
                    Hello
                </Col>
            </Row>
            <Row>
                <Col>No Span; Default 24</Col>
            </Row>
        </>
    ),
    wInfo(`
        ### Notes
        
        Basic layout.
        
        ### Usage
        ~~~js
        <Row>
            <Col span={6}>Hello</Col>
            <Col span={6}>Hello</Col>
            <Col span={6}>Hello</Col>
        </Row>
        ~~~`)
);

export default stories;
