import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, darkGray, gray } from './util';
import { Col } from '../../src/Grid';

const ColumnOffset = (stories: any) => {
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
};

export default ColumnOffset;
