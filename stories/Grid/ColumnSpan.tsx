import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, darkGray, gray, lightGray } from './util';
import { Col } from '../../src/Grid';
import { GRID_COLUMN_MAX } from '../../src/Grid/util';

const ColumnSpan = (stories: any) => {
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
};

export default ColumnSpan;
