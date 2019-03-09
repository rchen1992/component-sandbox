import * as React from 'react';
import { Row } from '../../src/Grid';
import { wInfo } from '../../src/utils';
import { getRowStyle, getColStyle, darkGray } from './util';
import { Col } from '../../src/Grid';
import { action } from '@storybook/addon-actions';

const CustomTag = (stories: any) => {
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
};

export default CustomTag;
