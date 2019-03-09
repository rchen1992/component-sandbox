import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, darkGray, gray, lightGray } from './util';
import { Col } from '../../src/Grid';

const ResponsiveSpan = (stories: any) => {
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

        Screen sizes:

        **\`xs\`**: <768px

        **\`sm\`**: >=768px

        **\`md\`**: >=992px

        **\`lg\`**: >=1200px

        **\`xl\`**: >=1920px

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
};

export default ResponsiveSpan;
