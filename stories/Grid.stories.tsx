import * as React from 'react';

import { storiesOf } from '@storybook/react';
// import { boolean, color, object, select, text } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
import { wInfo } from '../src/utils';
import { Row, Col } from '../src/Grid';
import { GRID_COLUMN_MAX } from '../src/Grid/util';

const darkGray = 'hsl(215, 23%, 67%)';
const gray = 'hsl(212, 28%, 86%)';
const lightGray = 'hsl(222, 33%, 92%)';

const getColStyle = (bgColor: string) => {
    return {
        style: {
            backgroundColor: bgColor,
            borderRadius: '4px',
            height: '40px',
        },
    };
};

const getRowStyle = () => {
    return {
        style: {
            marginBottom: '20px',
        },
    };
};

const stories = storiesOf('Components/Grid', module) as any;

/**
|--------------------------------------------------
| Column Span
|--------------------------------------------------
*/
stories.add(
    'Column Span',
    () => (
        <>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={6} />
                <Col {...getColStyle(gray)} span={6} />
                <Col {...getColStyle(lightGray)} span={6} />
                <Col {...getColStyle(darkGray)} span={6} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={8} />
                <Col {...getColStyle(gray)} span={8} />
                <Col {...getColStyle(lightGray)} span={8} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={2} />
                <Col {...getColStyle(gray)} span={4} />
                <Col {...getColStyle(lightGray)} span={6} />
                <Col {...getColStyle(darkGray)} span={8} />
                <Col {...getColStyle(gray)} span={4} />
            </Row>
        </>
    ),
    wInfo(`
        ### Notes

        A grid uses ${GRID_COLUMN_MAX} columns.

        A Row with a Col (no props) will span the entirety of the grid.
        
        Use span to change column width.
        
        ### Usage
        ~~~js
        <Row>
            <Col></Col>
        </Row>
        <Row>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
        </Row>
        <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
        </Row>
        <Row>
            <Col span={2}></Col>
            <Col span={4}></Col>
            <Col span={6}></Col>
            <Col span={8}></Col>
            <Col span={4}></Col>
        </Row>
        ~~~`)
);

/**
|--------------------------------------------------
| Column Offset
|--------------------------------------------------
*/
stories.add(
    'Column Offset',
    () => (
        <>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={6} />
                <Col {...getColStyle(gray)} span={6} offset={6} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={6} offset={6} />
                <Col {...getColStyle(gray)} span={6} offset={6} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(gray)} span={12} offset={6} />
            </Row>
            <Row {...getRowStyle()}>
                <Col {...getColStyle(darkGray)} span={2} />
                <Col {...getColStyle(gray)} span={2} offset={20} />
            </Row>
        </>
    ),
    wInfo(`
        ### Notes
        
        Use offset to give spacing to the left side of a column.
        
        ### Usage
        ~~~js
        <Row>
            <Col span={6}></Col>
            <Col span={6} offset={6}></Col>
        </Row>
        <Row>
            <Col span={6} offset={6}></Col>
            <Col span={6} offset={6}></Col>
        </Row>
        <Row>
            <Col span={12} offset={6}></Col>
        </Row>
        <Row>
            <Col span={2}></Col>
            <Col span={2} offset={20}></Col>
        </Row>
        ~~~`)
);

export default stories;
