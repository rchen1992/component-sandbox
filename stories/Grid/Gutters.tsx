import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, darkGray, gray, lightGray } from './util';
import { Col } from '../../src/Grid';

const Gutters = (stories: any) => {
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
};

export default Gutters;
