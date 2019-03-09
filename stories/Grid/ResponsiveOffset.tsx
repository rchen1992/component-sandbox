import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, gray } from './util';
import { Col } from '../../src/Grid';

const ResponsiveOffset = (stories: any) => {
    stories.add(
        'Responsive Offset',
        () => (
            <Row {...getRowStyle()} gutter={10}>
                <Col
                    {...getColStyle(gray)}
                    xs={{ span: 12, offset: 2 }}
                    sm={{ span: 10, offset: 4 }}
                    md={{ span: 8, offset: 6 }}
                    lg={{ span: 6, offset: 8 }}
                    xl={{ span: 4, offset: 10 }}
                />
            </Row>
        ),
        wInfo(`
        ### Notes

        You can use an object to specify both **\`span\`** and **\`offset\`** for each breakpoint.

        ### Usage
        ~~~js
        <Row>
            <Col
                xs={{ span: 12, offset: 2 }}
                sm={{ span: 10, offset: 4 }}
                md={{ span: 8, offset: 6 }}
                lg={{ span: 6, offset: 8 }}
                xl={{ span: 4, offset: 10 }}
            />
        </Row>
        ~~~`)
    );
};

export default ResponsiveOffset;
