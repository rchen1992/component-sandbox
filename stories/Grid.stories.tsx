import * as React from 'react';

import { storiesOf } from '@storybook/react';
// import { boolean, color, object, select, text } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
import { wInfo } from '../src/utils';
import { Row, Col } from '../src/Grid';
import { GRID_COLUMN_MAX } from '../src/Grid/util';
import { action } from '@storybook/addon-actions';

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

        A grid uses **${GRID_COLUMN_MAX}** columns.

        A Row with a Col (no props) will span the entirety of the grid.
        
        Use **\`span\`** to change column width.
        
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
        
        Use **\`offset\`** to give spacing to the left side of a column.
        
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

/**
|--------------------------------------------------
| Gutters
|--------------------------------------------------
*/
stories.add(
    'Gutters',
    () => (
        <Row gutter={20} {...getRowStyle()}>
            <Col {...getColStyle(darkGray)} span={6} />
            <Col {...getColStyle(gray)} span={6} />
            <Col {...getColStyle(lightGray)} span={6} />
            <Col {...getColStyle(darkGray)} span={6} />
        </Row>
    ),
    wInfo(`
        ### Notes
        
        Use **\`gutter\`** to give spacing between each column.
        
        ### Usage
        ~~~js
        <Row gutter={20}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
        </Row>
        ~~~`)
);

/**
|--------------------------------------------------
| Custom Tag
|--------------------------------------------------
*/
stories.add(
    'Custom Tag',
    () => (
        <Row tag="section" {...getRowStyle()}>
            <Col {...getColStyle(darkGray)} span={4} tag="button" onClick={action('onClick')}>
                Hello
            </Col>
        </Row>
    ),
    wInfo(`
        ### Notes

        By default, Rows and Cols are rendered as divs.
        
        You can use the **\`tag\`** prop to change the element tag of a Col or Row.

        In the example above, we are rendering the row as a **\`section\`** and the Col as a **\`button\`**.
        
        ### Usage
        ~~~js
        <Row tag="section">
            <Col tag="button" span={4} onClick={() => {})}>
                Hello
            </Col>
        </Row>
        ~~~`)
);

/**
|--------------------------------------------------
| Responsive Span
|--------------------------------------------------
*/
stories.add(
    'Responsive Span',
    () => (
        <Row {...getRowStyle()} gutter={10}>
            <Col {...getColStyle(darkGray)} xs={8} sm={6} md={4} lg={3} xl={1} />
            <Col {...getColStyle(gray)} xs={4} sm={6} md={8} lg={9} xl={11} />
            <Col {...getColStyle(lightGray)} xs={4} sm={6} md={8} lg={9} xl={11} />
            <Col {...getColStyle(darkGray)} xs={8} sm={6} md={4} lg={3} xl={1} />
        </Row>
    ),
    wInfo(`
        ### Notes

        Use **\`xs\`**, **\`sm\`**, **\`md\`**, **\`lg\`**, **\`xl\`** to specify a responsive span of a column.

        ### Usage
        ~~~js
        <Row>
            <Col xs={8} sm={6} md={4} lg={3} xl={1} />
            <Col xs={4} sm={6} md={8} lg={9} xl={11} />
            <Col xs={4} sm={6} md={8} lg={9} xl={11} />
            <Col xs={8} sm={6} md={4} lg={3} xl={1} />
        </Row>
        ~~~`)
);

/**
|--------------------------------------------------
| Responsive Offset
|--------------------------------------------------
*/
stories.add(
    'Responsive Offset',
    () => (
        <Row {...getRowStyle()} gutter={10}>
            <Col {...getColStyle(darkGray)} xs={8} md={4} />
            <Col {...getColStyle(gray)} xs={4} sm={6} lg={10} />
        </Row>
    ),
    wInfo(`
        ### Notes

        Use **\`xs\`**, **\`sm\`**, **\`md\`**, **\`lg\`**, **\`xl\`** to specify a responsive span of a column.

        ### Usage
        ~~~js
        <Row>
            <Col xs={8} md={4} />
            <Col xs={4} sm={6} lg={10} />
        </Row>
        ~~~`)
);

export default stories;
